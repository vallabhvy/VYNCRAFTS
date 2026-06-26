# VynCrafts

Digital studio marketing site — React frontend, Express contact API, and Resend email notifications.

**Stack:** React 19 · Vite · Tailwind CSS · Express · Resend

## Run locally

```bash
pnpm install
pnpm run dev          # frontend at http://localhost:5173
pnpm run dev:api      # API at http://localhost:5000 (separate terminal)
```

Copy `backend/.env.example` to `backend/.env` and add your Resend API key.

## Production build

```bash
pnpm run build
SERVE_STATIC=true pnpm run start
```

Open `http://localhost:5000` — serves the built site and `/api/contact`.

## Deploy to Netlify (recommended — free)

Netlify hosts the static site on a global CDN (always fast, no sleep) and runs the contact form as a **serverless function** — no paid hosting required.

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. **Add new site** → **Import an existing project** → select **`vallabhvy/VYNCRAFTS`**
3. Netlify reads [`netlify.toml`](netlify.toml) automatically:
   - **Build command:** `pnpm run build`
   - **Publish directory:** `dist`
4. Open **Site configuration** → **Environment variables** and add:

| Variable | Value | Secret? |
|---|---|---|
| `RESEND_API_KEY` | Your Resend API key | **Yes** — mark as secret |
| `CONTACT_NOTIFY_EMAIL` | `team@vyncrafts.com` | No — this email is public on the site |
| `CONTACT_FROM_EMAIL` | `VynCrafts <team@vyncrafts.com>` | No |
| `NODE_ENV` | `production` | No |

   Only mark `RESEND_API_KEY` as a secret. If Netlify flags `CONTACT_NOTIFY_EMAIL` during the build, it’s because that address already appears in the public JavaScript bundle — that’s expected.

5. Click **Deploy site**
6. Optional: under **Domain management**, add `vyncrafts.com` and follow the DNS steps

The contact form posts to `/api/contact`, which Netlify routes to the function in [`netlify/functions/contact.ts`](netlify/functions/contact.ts).

Do **not** set `RESEND_SKIP_TLS_VERIFY` in production.

### Custom domain (`vyncrafts.com`) on Netlify

1. **Domain management** → **Add a domain** → enter `vyncrafts.com`
2. Add the DNS records Netlify shows at your registrar (usually an `A` record and/or `CNAME` for `www`)
3. Wait for SSL to provision (usually a few minutes)

## Deploy to Railway (paid — no 15‑min sleep)

Railway keeps your service running 24/7 on the **Hobby plan ($5/mo)**. Unlike Render’s free tier, it does **not** spin down after inactivity (unless you turn on **Serverless** in service settings).

1. Go to [railway.com](https://railway.com) and sign in with GitHub
2. **New Project** → **Deploy from GitHub repo** → select **`vallabhvy/VYNCRAFTS`**
3. Railway reads [`railway.toml`](railway.toml) and builds automatically
4. Open **Variables** and add:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_NOTIFY_EMAIL` | `team@vyncrafts.com` |
| `CONTACT_FROM_EMAIL` | `VynCrafts <team@vyncrafts.com>` |
| `SERVE_STATIC` | `true` |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGIN` | `https://vyncrafts.com,https://www.vyncrafts.com` |

5. **Settings** → **Networking** → **Generate Domain** (you’ll get a `*.up.railway.app` URL)
6. Optional: add custom domain `vyncrafts.com` under **Custom Domain**

**Tip:** Leave **Serverless** disabled if you need the contact form to respond instantly to webhooks or first visits.

### Railway vs Render

| | Railway Hobby | Render Free |
|---|---|---|
| Cost | $5/mo | $0 |
| Sleeps when idle? | No (by default) | Yes (~15 min) |
| Good for production? | Yes | Side projects only |

## Deploy to Render (free alternative)

This repo also includes a [`render.yaml`](render.yaml) blueprint. Render’s **free** tier sleeps after ~15 minutes of inactivity — fine for testing, not ideal for a live business site.

1. Push this repo to GitHub: [vallabhvy/VYNCRAFTS](https://github.com/vallabhvy/VYNCRAFTS)
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect the `VYNCRAFTS` repository
4. Add the secret env var **`RESEND_API_KEY`** when prompted
5. Click **Apply** and wait for the deploy to finish

Render will build the site, install the backend, and serve both from one URL.

### Custom domain (`vyncrafts.com`) on Render

1. In Render → your service → **Settings** → **Custom Domains**
2. Add `vyncrafts.com` and `www.vyncrafts.com`
3. Add the DNS records Render shows at your domain registrar
4. Wait for SSL to provision (usually a few minutes)

### Production environment variables (Render or Railway)

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key (secret) |
| `CONTACT_NOTIFY_EMAIL` | `team@vyncrafts.com` |
| `CONTACT_FROM_EMAIL` | `VynCrafts <team@vyncrafts.com>` |
| `SERVE_STATIC` | `true` |
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGIN` | `https://vyncrafts.com,https://www.vyncrafts.com` |

Do **not** set `RESEND_SKIP_TLS_VERIFY` in production.

## Customize

- **Content:** `src/data/content.ts`
- **Contact links:** `contactLinks` in `src/data/content.ts`
- **Colors / motion:** `tailwind.config.js`, `src/index.css`

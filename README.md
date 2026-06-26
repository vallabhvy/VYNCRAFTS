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

## Deploy to Render

This repo includes a [`render.yaml`](render.yaml) blueprint for one-click deployment.

1. Push this repo to GitHub: [vallabhvy/VYNCRAFTS](https://github.com/vallabhvy/VYNCRAFTS)
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect the `VYNCRAFTS` repository
4. Add the secret env var **`RESEND_API_KEY`** when prompted
5. Click **Apply** and wait for the deploy to finish

Render will build the site, install the backend, and serve both from one URL.

### Custom domain (`vyncrafts.com`)

1. In Render → your service → **Settings** → **Custom Domains**
2. Add `vyncrafts.com` and `www.vyncrafts.com`
3. Add the DNS records Render shows at your domain registrar
4. Wait for SSL to provision (usually a few minutes)

### Production environment variables

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

# VynCrafts

Digital studio marketing site — vibrant editorial design with motion, custom cursor, bento services grid, and contact API.

**Stack:** React 19 · Vite · Tailwind CSS · Express · Fontshare (Clash Display, Satoshi) · Google Fonts (Space Mono)

## Run locally

**Frontend only** (contact form needs the API below):

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Contact API** (required for form submissions):

```bash
cd backend
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:5000`. Submissions are saved to `backend/submissions.json`.

Run both in separate terminals for full functionality.

## Build

```bash
pnpm run build
pnpm run preview
```

## Customize

- **Content:** `src/data/content.ts`
- **Contact links:** `contactLinks` in `src/data/content.ts`
- **Colors / motion:** `tailwind.config.js`, `src/index.css`

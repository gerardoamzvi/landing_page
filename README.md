# Find my date boss — Landing Page

**Stop applying. Start matching.**

The marketing site for **Find my date boss**, a personality-first hiring experience for startup teams and candidates. The product puts working style, human context, and mutual interest before a conventional application flow.

**Live site:** https://findmydaddy.vercel.app/

## What this site contains

- Product story and positioning
- Candidate and founder journeys
- Native app-screen previews
- FAQ and early-access call to action
- Responsive layouts for desktop, smaller laptops, tablets, and mobile
- Open Graph and Twitter Card metadata for shared-link previews

## Tech stack

- React 19
- TypeScript
- Vite
- CSS
- Vercel for deployment

## Run locally

Install dependencies once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local address in the terminal, normally `http://localhost:5173/`.

## Build for production

```bash
npm run build
```

The generated production files are written to `dist/`.

## Project structure

```text
src/
  main.tsx       # Landing-page structure and content
  styles.css     # Visual system and responsive layouts
public/
  app-screens/   # Product interface imagery used by the page
  og-image.png   # Social sharing preview image
index.html       # Document metadata, including social preview tags
```

## Deployment

Vercel deploys the site from the `main` branch of this repository. After reviewing local changes:

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Vercel will create a new production deployment automatically.

## Shared-link preview

The live page provides Open Graph and Twitter Card metadata. Messaging platforms can show the title, description, and preview image when this link is pasted:

```text
https://findmydaddy.vercel.app/
```

Some platforms cache previews. If a service still shows an old preview immediately after a deployment, paste a one-time versioned URL such as `https://findmydaddy.vercel.app/?v=2`.
# Van Nam Phuc — Personal Portfolio

A modern, high-performance developer portfolio built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **Nitro**.

Featuring smooth animations, interactive WebGL wave backgrounds, an optimized project showcase with an interactive image lightbox, and direct contact email dispatching via server-side Nodemailer.

---

## Features

- **Fullstack SSR**: Built with [TanStack Start](https://tanstack.com/start) & [Nitro](https://nitro.unjs.io/) for high-speed SSR, routing, and Vercel edge/serverless compatibility.
- **Warm Light/Dark Aesthetic**: Beige/olive theme pair with fluid typography, glassmorphism cards, theme toggle with FOUC-free hydration, plus interactive WebGL waves (`ogl`) and a glow cursor trail.
- **Interactive Projects Gallery**:
  - WebP-optimized screenshots with Unpic responsive image optimization (`@unpic/react`).
  - High-res Lightbox modal viewer supporting multi-image galleries with smooth keyboard navigation (`Esc`, `←`, `→`).
- **Serverless Contact Form**:
  - Powered by TanStack Start Server Functions (`createServerFn`) with Zod validation.
  - Sends direct email notifications via SMTP (Gmail, Resend, or Brevo) without third-party redirects or client-side secret exposure.
  - Honeypot trap + per-IP rate limiting for spam protection.
- **SEO Ready**: Open Graph / Twitter cards, JSON-LD person schema, canonical links, and build-time `sitemap.xml` + `robots.txt`.
- **Ultra-fast Tooling**:
  - Bundled by [Vite](https://vitejs.dev/).
  - Type-checked with TypeScript, formatted and linted with [Biome](https://biomejs.dev/).

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19, TypeScript) |
| **Server Engine** | [Nitro](https://nitro.unjs.io/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Base UI, Lucide Icons |
| **Animations** | [Motion](https://motion.dev/), GSAP, OGL |
| **Images** | WebP + [@unpic/react](https://unpic.pics/img/react/) |
| **Mail Transport** | [Nodemailer](https://nodemailer.com/) (Server Function) |
| **Validation & Env** | [Zod](https://zod.dev/), [@t3-oss/env-core](https://env.t3.gg/) |
| **Linter & Formatter** | [Biome](https://biomejs.dev/) |

---

## Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (`corepack enable pnpm` or `npm i -g pnpm`)

### 2. Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/vannamphuc/portfolio.git
cd portfolio
pnpm install
```

### 3. Environment Configuration

Copy the example `.env` file:

```bash
cp .env.example .env
```

Open `.env` and fill in your contact information and SMTP credentials:

```ini
# Public (also used for SEO: canonical URL, OG tags, sitemap)
VITE_BASE_URL=http://localhost:3000
VITE_MY_EMAIL=your_email@gmail.com
VITE_CONTACT_PHONE=0901234567
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-profile
VITE_GITHUB_URL=https://github.com/your-username

# SMTP Server Function (e.g. Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM=your_email@gmail.com
```

> **Note**: For Gmail, generate a 16-character **App Password** from [Google Account Security](https://myaccount.google.com/apppasswords) (requires 2FA enabled).

### 4. Running Locally

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Vite + TanStack Start dev server at port `3000` |
| `pnpm build` | Generates SEO files (`sitemap.xml`, `robots.txt`), then builds client + Nitro SSR bundle |
| `pnpm preview` | Locally previews the production build |
| `pnpm typecheck` | Type-checks the project (`tsc --noEmit`) |
| `pnpm format` | Formats codebase using Biome (`biome format --write`) |
| `pnpm lint` | Runs Biome linter (`biome lint`) |
| `pnpm check` | Full Biome check (`biome check`) |

---

## Deployment (Vercel)

This project is pre-configured with Nitro for instant Vercel deployment:

1. Push your code to your GitHub repository.
2. Import the repository in [Vercel](https://vercel.com).
3. The framework is preset to `TanStack Start` via `vercel.json`.
4. Add the environment variables from your `.env` (`VITE_BASE_URL`, `VITE_MY_EMAIL`, `VITE_CONTACT_PHONE`, `VITE_LINKEDIN_URL`, `VITE_GITHUB_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) in the Vercel Project Settings. Set `VITE_BASE_URL` to your production domain so OG tags, canonical links, and sitemap use the right URL.
5. Hit **Deploy**!

---

## License

Created by **Văn Nam Phúc**. Open-sourced under the [MIT License](LICENSE).

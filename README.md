# Ankush Sharma — Full-Stack Developer Portfolio

A modern, dark-mode full-stack portfolio built with Next.js, React, TypeScript, PostgreSQL, Prisma, GitHub API and Resend.

## 1. Install

```bash
npm install
```

## 2. Environment

Copy `.env.example` to `.env.local` and fill in:

- `DATABASE_URL`
- `GITHUB_USERNAME`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

Generate the admin hash:

```bash
node scripts/hash-password.mjs "YOUR_PASSWORD"
```

Paste the output into `ADMIN_PASSWORD_HASH`.

## 3. Database

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

For a hosted PostgreSQL database, put its connection string in `DATABASE_URL`.

## 4. Run

```bash
npm run dev
```

Open http://localhost:3000

Admin: http://localhost:3000/admin/login

## GitHub

The app reads public repositories from:

`GITHUB_USERNAME=ankush2971sharma-ai`

No token is required for the first setup. A server-side `GITHUB_TOKEN` can be added later to increase API limits.

The dashboard has a GitHub Sync button that imports non-fork repositories, descriptions, stars, forks, homepage links, languages and topics into PostgreSQL.

## Resend

Set `RESEND_API_KEY` and `CONTACT_EMAIL`. Contact form submissions are always stored in PostgreSQL. Email notification is attempted after storage so a mail-provider failure does not lose the message.

Before production, replace the default Resend sender with a verified domain sender in `lib/resend.ts`.

## Production security

This starter uses a single-admin session cookie suitable for a small portfolio. Before deploying a high-value admin system, use a production session store/rotation strategy and add rate limiting/WAF protection to login and contact endpoints.

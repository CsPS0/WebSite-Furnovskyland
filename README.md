# 🏛️ Furnovskyland Official Website 🌐

[![Status: Active](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](STATUS)
[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=for-the-badge)](https://nextjs.org/)

Welcome to the official repository for the **Empire of Furnovskyland's Commonwealth** website! It's a Next.js app in four languages (EN, HU, DE, SK) where citizens log in with Discord and vote in elections and law votes. Results are counted automatically and posted to the Discord server.

## 🚀 Running the site locally

You need [Bun](https://bun.sh).

```bash
bun install
cp .env.example .env.local   # then fill in AUTH_SECRET and IP_HASH_SECRET at least
bun run dev                  # http://localhost:3000
```

Without `DATABASE_URL`, the site uses an embedded Postgres stored in `.pglite/`, so nothing else needs to be installed.

**Testing without a Discord app:** set `DEV_FAKE_LOGIN=1`, `DEV_FAKE_ROLES={"175928847299117063":["admin","emperor"]}` and `ADMIN_ROLE_IDS=admin`, `EMPEROR_ROLE_IDS=emperor` in `.env.local`. Then open `/api/auth/login/?dev_user=175928847299117063&dev_name=Test` to log in as that user. This only works in `bun run dev`, never in production.

```bash
bun test        # vote counting, alt-account flags, login cookies
bun run lint
bun run build   # runs database migrations first when DATABASE_URL is set
```

## 🗳️ How voting works

- **Login:** Discord OAuth (`identify` scope). The site's bot reads each voter's roles on the Furnovskyland server every time they vote.
- **Who can vote:** set per vote by choosing Discord roles; leave it empty for every server member.
- **Ballot types:** law (yes / no / abstain), pick one, pick several, ranked choice (instant runoff).
- **Law rules:** simple or two-thirds majority, optional minimum number of ballots, and an optional Emperor veto window after a law passes.
- **Secret ballot:** only totals are published. Admins see who voted, not what they picked.
- **Alt accounts:** ballots that share a device or connection with another voter, or come from a Discord account younger than 30 days or a server member of less than 7 days, are flagged for admins. Admins can void a ballot until the vote closes. Raw IP addresses are never stored, only a keyed hash.
- **Schedule:** each published vote gets a durable [Workflow](https://workflow-sdk.dev) run that opens it, counts it at the exact closing minute, posts to Discord (elections to 『🗳️』elections, laws to federal-gazette) and handles the veto window.
- **Admin area:** `/en/admin/` (or any language), for anyone with a role listed in `ADMIN_ROLE_IDS`.

## ☁️ Deploying on Vercel

1. Import the repository in Vercel; it detects Next.js and Bun.
2. Add a Neon Postgres database from the Vercel Marketplace (Storage → Neon), or with the CLI: `vercel integration add neon`. That sets `DATABASE_URL`.
3. In the [Discord Developer Portal](https://discord.com/developers/applications), create an application:
   - **OAuth2:** copy the client ID and secret, and add the redirect `https://<your-domain>/api/auth/callback/` (the trailing slash matters).
   - **Bot:** create a token and invite the bot to the server. It needs no permissions; if member lookups fail, turn on the *Server Members Intent*.
4. Create two webhooks (*Edit channel → Integrations → Webhooks → New webhook*, then copy the URL): one in 『🗳️』elections (`DISCORD_WEBHOOK_URL`) and one in federal-gazette for law votes (`DISCORD_LAW_WEBHOOK_URL`).
5. Set the variables from `.env.example` in the Vercel project settings. Discord posts are in English; set `ANNOUNCE_LANG` to `hu`, `de` or `sk` to change that.

## 🔧 Technical overview

- **Framework:** Next.js 16 (App Router, Cache Components) on Bun
- **Styling:** Tailwind CSS 4 (`app/globals.css`)
- **Data:** Neon Postgres via Drizzle ORM (`db/schema.ts`, migrations in `drizzle/`)
- **Scheduling:** Workflow SDK (`workflows/election.ts`)
- **Translations:** `messages/{en,hu,de,sk}.json`
- **Live data:** Discord widget and `mcsrvstat.us`, cached for a few minutes

## 🧑‍💻 Devs & Contributors

* [CsPS](https://github.com/CsPS0)
* [Furnovsky](https://github.com/Furnovsky963)

Interested in contributing to Furnovskyland's digital infrastructure? Open a Pull Request or create an Issue on GitHub!

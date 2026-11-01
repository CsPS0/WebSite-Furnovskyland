# Furnovskyland Official Website and Voting Platform

- **Website:** [https://furnovskyland.vercel.app/](https://furnovskyland.vercel.app/)
- **Discord Server:** [https://discord.gg/UjcUnNhNfk](https://discord.gg/UjcUnNhNfk)

---

## Why This Project Exists

Furnovskyland is an online community and constitutional monarchy founded in 2018. Over time, its governance evolved to include a written constitution, a Senate, a federal government, a Supreme Court, and regular elections and legislative votes.

Running elections and law votes inside Discord channels through message reactions or generic poll bots created recurring problems:

1. **No secret ballot:** Public reaction polls expose how each member voted, creating social pressure and tactical voting as people watch live tallies.
2. **Rigid voting systems:** Standard Discord polls cannot run instant-runoff (ranked-choice) elections, multi-seat plurality elections, or legislative votes that require specific quorum thresholds, two-thirds supermajorities, and constitutional veto windows.
3. **Weak eligibility and anti-abuse controls:** Restricting specific votes to particular server roles (such as Senators, Ministers, or verified citizens) while detecting duplicate or newly created alternate accounts is difficult without a dedicated backend.

The goal of this project is to solve those problems in a single, self-contained web application. It serves both as the multilingual public portal for Furnovskyland (in English, Hungarian, German, and Slovak) and as a verifiable, role-gated voting system that any Discord-based community, organization, or online state can self-host and adapt for its own governance.

---

## How It Works

### Identity and Role Verification
- Citizens sign in with Discord OAuth2 (`identify` scope).
- Session state is stored in an HTTP-only, HMAC-SHA256 signed cookie (`lib/session.ts`).
- A lightweight Discord bot reads the voter's current membership and roles directly from the Discord guild API (`lib/discord.ts`). The bot does not need administrative permissions on the server; it only reads member and role lists.
- Each vote can be opened to every server member or restricted to a specific set of Discord roles. An optional server-wide login whitelist (`LOGIN_ROLE_IDS`) can also restrict platform access during testing or closed sessions.

### Ballot Types and Counting (`lib/tally.ts`)
- **Law Vote (`law`):** Yes / No / Abstain ballots. Supports simple majority (`> 50%` of Yes + No) or two-thirds majority (`>= 2/3` of Yes + No), optional minimum ballot quorum (counting abstentions toward turnout), and an configurable post-passage veto window for the head of state (`EMPEROR_ROLE_IDS`).
- **Single-Choice Election (`single`):** Standard first-past-the-post election where each voter selects one candidate.
- **Multi-Choice Election (`multi`):** Voters select up to `N` candidates; the top `N` candidates win, with automatic tie detection at the cutoff.
- **Ranked-Choice Election (`ranked`):** Instant-runoff voting where voters number candidates in order of preference. If no candidate reaches a majority in round one, the lowest-polling candidates are eliminated round by round and their ballots transfer to the next ranked preference until a winner is decided or a tie is reached.

### Secret Ballot and Alt-Account Protection (`lib/flags.ts`)
- Public pages never reveal individual ballots, and results remain hidden until the vote closes.
- Administrators can view the voter roll (who voted and when) without ever seeing what a voter chose.
- To guard against duplicate voting with alternate accounts, each ballot records a device token and an HMAC-SHA256 hash of the client IP address (raw IP addresses are never stored). The admin panel automatically flags ballots that:
  - Share a device cookie with another voter in the same election
  - Share a hashed IP connection with another voter in the same election
  - Come from a Discord account created less than 30 days before the vote
  - Come from a member who joined the Discord server less than 7 days before the vote
- Administrators can void (or restore) flagged ballots at any point before the election closes.

### Lifecycle Scheduling and Discord Announcements (`lib/elections.ts`, `lib/announce.ts`)
- Each published vote transitions automatically through `scheduled -> open -> veto_window (if applicable) -> final` (or `vetoed` / `cancelled`).
- State transitions use atomic conditional SQL updates so concurrent background jobs and page requests never double-count or double-post announcements.
- When a vote opens, closes with results, is vetoed, or becomes final, the server posts an embed via Discord webhook to the configured channel(s).

---

## How to Run and Host It Yourself

### 1. Prerequisites
- [Bun](https://bun.sh/) (v1.3 or newer)
- A Discord account and server where you can create an application, invite a bot, and create channel webhooks
- For production: any PostgreSQL database (self-hosted Postgres, Docker Postgres, Neon, Supabase, Railway, etc.). For local development, no external database is needed.

### 2. Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/CsPS0/WebSite-Furnovskyland.git
cd WebSite-Furnovskyland
bun install
cp .env.example .env.local
```

Generate two random 32+ character secrets for `AUTH_SECRET` and `IP_HASH_SECRET` in `.env.local`:

```bash
openssl rand -base64 32
```

When `DATABASE_URL` is left empty in `.env.local`, the application automatically uses an embedded PostgreSQL instance stored in `.pglite/` and applies all database migrations on startup.

#### Testing Locally Without a Discord App
If you want to test the voting system locally before creating a Discord application, add the following to `.env.local`:

```env
DEV_FAKE_LOGIN=1
DEV_FAKE_ROLES={"1001":["admin","emperor"],"1002":["senator"],"1003":[]}
ADMIN_ROLE_IDS=admin
EMPEROR_ROLE_IDS=emperor
```

Start the development server:

```bash
bun run dev
```

Then visit `http://localhost:3000/api/auth/login/?dev_user=1001&dev_name=Admin` to sign in as an admin and open `http://localhost:3000/en/admin/`. (`DEV_FAKE_LOGIN` is disabled automatically when `NODE_ENV=production`.)

### 3. Configuring Discord (OAuth2, Bot, and Webhooks)

1. **Create a Discord Application:**
   - Open the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. **Configure OAuth2:**
   - Open the **OAuth2** tab, copy the **Client ID** (`AUTH_DISCORD_ID`) and **Client Secret** (`AUTH_DISCORD_SECRET`).
   - Under **Redirects**, add your callback URL with the trailing slash:
     - Local: `http://localhost:3000/api/auth/callback/`
     - Production: `https://your-domain.example/api/auth/callback/`
3. **Configure and Invite the Bot:**
   - Open the **Bot** tab, reset and copy the bot token (`DISCORD_BOT_TOKEN`).
   - Enable **Server Members Intent** under *Privileged Gateway Intents* and save.
   - Invite the bot to your Discord server using:
     `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=0&guild_id=YOUR_GUILD_ID`
4. **Configure Webhooks and Role IDs:**
   - Set `DISCORD_GUILD_ID` to your Discord server ID.
   - In your Discord server, create a webhook in your elections channel (**Edit Channel -> Integrations -> Webhooks -> New Webhook**) and set `DISCORD_WEBHOOK_URL`. Optionally set `DISCORD_LAW_WEBHOOK_URL` if law votes should be announced in a separate gazette channel.
   - Copy the role IDs for your election administrators into `ADMIN_ROLE_IDS` and the head-of-state role ID into `EMPEROR_ROLE_IDS`.

### 4. Deploying to Any Host

This application is a standard Next.js 16 server application using PostgreSQL via Drizzle ORM (`db/schema.ts`, migrations in `drizzle/`). You can host it on any platform that supports Node.js/Bun and PostgreSQL:

1. **Provision a PostgreSQL Database:**
   - Create a PostgreSQL database on your preferred provider (a self-hosted VPS, Docker container, Railway, Fly.io, Render, Supabase, or Neon) and set `DATABASE_URL` to its connection string.
2. **Set Environment Variables:**
   - Configure all variables listed in `.env.example` (`SITE_URL`, `AUTH_SECRET`, `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`, `DISCORD_BOT_TOKEN`, `DISCORD_GUILD_ID`, `DISCORD_WEBHOOK_URL`, `ADMIN_ROLE_IDS`, `EMPEROR_ROLE_IDS`, `IP_HASH_SECRET`, `DATABASE_URL`).
3. **Build and Start:**
   - The build script automatically runs pending SQL migrations against `DATABASE_URL` before compiling the application:
     ```bash
     bun run build
     bun run start
     ```
   - On container or VPS hosts (Docker, systemd, Coolify, Dokploy, Railway, Fly.io, Render), run `bun run build` during the image/build step and `bun run start` (port `3000` by default) as the runtime command.
   - On serverless Next.js platforms, point the project at the repository root with `bun run build` as the build command.

---

## Development and Branching Workflow

```bash
bun test        # Run unit tests (vote tallying, alt-account flags, session signing)
bun run lint    # Run ESLint
bun run build   # Run database migrations and production build
```

- **`dev`:** Default development branch for ongoing work and testing. All day-to-day commits and pushes go to `dev`.
- **`main`:** Production branch. Changes are merged from `dev` into `main` only when ready for a production release.

---

## Contributors

- [CsPS](https://yoursit.ee/csps) — Maintainer ([GitHub](https://github.com/CsPS0))
- [Furnovsky](https://github.com/Furnovsky963)

## License

Released under the [MIT License](LICENSE).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Branching & Deployment Rules

- **Default working branch:** Always work, commit, and push on the `dev` branch (`git checkout dev`, `git push origin dev`).
- **Protected production branch (`main`):** Never commit or push directly to `main`. Vercel deploys production (`furnovskyland.vercel.app`) from `main`.
- **Releasing to production:** Only merge `dev` into `main` and push `origin main` when the user explicitly asks to deploy/release to production, then switch back to `dev` immediately afterwards.
- **Pre-commit checks:** Run `bun test` and `bun run lint` before committing. Never commit `.env.local`, `.pglite/`, or any secrets/tokens.

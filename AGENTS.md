# Repository Guidelines

## Project Overview

This repository is a French interactive course site with an activation-key auth layer.

- Root static pages and course folders are served directly in local/Render mode by `server.js`.
- API routes are built with Fastify in `server/app.js` and registered from `server/routes/`.
- Vercel uses `api/index.js` as the serverless Fastify entry point and `middleware.js` for edge access checks.
- `scripts/build.js` generates the static `dist/` output and injects auth/chat scripts into HTML files.

## Key Paths

- `server.js`: local/Render entry point, static file server, auth injection, protected content checks.
- `server/app.js`: shared Fastify app, plugins, rate limiting, API route registration.
- `server/db.js`: PostgreSQL connection, schema creation/migrations, key/session/log helpers.
- `server/routes/auth.js`: activation, verification, logout, course metadata.
- `server/routes/admin.js`: admin login and activation key management.
- `server/routes/ai-chat.js`: authenticated OpenRouter proxy for RD-AI chat.
- `server/middleware/access-control.js`: canonical course list, themes, icons, and protected-content logic for Node serving.
- `middleware.js`: Vercel edge copy of the protected-content logic.
- `public/`: auth/admin assets served under `/_auth/`.
- Course folders: `linux/`, `php/`, `probabilites/`, `rd_java/`, `rd_winserver/`, `admin-vm/`, `droit/`, `RD-RO/`, `sql/`, `csharp/`, `uml/`, `ccna/`, `uiux/`, `assembleur/`, `Cyber securite B2/`, `docker/`, `infographie/`, `roadmap/`, and related course content folders.

## Commands

- Install dependencies: `npm install`
- Run locally with file watching: `npm run dev`
- Run locally without watch: `npm start`
- Build static output: `npm run build`
- Vercel build command: `npm run vercel-build`

There is no test script configured in `package.json`. For code changes, use the narrowest practical smoke check:

- API/server changes: run `npm run dev` if environment variables and PostgreSQL are available.
- Static/build changes: run `npm run build` and inspect the generated `dist/`.
- Frontend changes: open the affected page locally and verify auth script injection does not break layout.

## Environment

`server.js` requires these variables before startup:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Optional variables used by the app:

- `PORT` defaults to `3000`.
- `NODE_ENV=production` enables production cookie/security behavior and PostgreSQL SSL handling.
- `COOKIE_DOMAIN` sets auth/admin cookie domain when needed.
- `KEY_CLASS` defaults to `b2` for admin key filtering.
- `OPENROUTER_API_KEY` enables `/api/ai-chat`.

Never commit `.env` or secrets. `.env` is ignored and may exist locally.

## Development Notes

- Keep access-control course lists in sync across `server/middleware/access-control.js`, `middleware.js`, and `scripts/build.js` when adding/removing courses.
- Course folder names include spaces and mixed case, especially `Cyber securite B2`; quote paths in shell commands.
- `dist/` is generated output. Do not hand-edit it unless the user explicitly asks.
- `scripts/build.js` deletes and recreates `dist/`; avoid running it if preserving local generated output matters.
- `server/db.js` creates and migrates PostgreSQL tables at startup, so DB changes need extra care.
- Auth cookies are HTTP-only. Browser-side auth state usually depends on `/api/verify`.
- Protected content rules currently make course indexes and chapter 1 public, protect later HTML/PDF content, and always protect QCM data.
- If changing AI chat behavior, keep the API key server-side only and preserve request-size/rate-limit protections.

## Git Hygiene

- Existing untracked or modified user files should be preserved.
- Large reference files and generated assets are intentionally ignored by `.gitignore`, including PDFs, docs, `dist/`, `node_modules/`, `.vscode/`, and `b1/`.
- The `npm run stop` script uses `taskkill /F /IM node.exe`; it is broad on Windows, so avoid it unless the user specifically wants all Node processes stopped.

# CLAUDE.md — Peninsula KoC Live Tracker

Static React site tracking a friend-hosted Warhammer 40,000 "King of the Colosseum"
league (500pt lists, best-of-3 matches, custom rules). Live at https://peninsula-koc.com.

## Stack & Build

- Vite 7 + React 18 + TypeScript, `react-router-dom` v7 (BrowserRouter), `react-markdown`.
- `npm run dev` (local test), `npm run build` (`tsc -b && vite build`), `npm run lint` (eslint 9 flat config in [eslint.config.js](eslint.config.js)).
- Deployed by **Cloudflare** (Pages/Workers) — pushing to `main` triggers a release. [wrangler.toml](wrangler.toml) is mostly a stub; [_redirects](_redirects) (also copied in [public/_redirects](public/_redirects)) does the SPA rewrite `/* -> /index.html 200`.
- No `.gitignore`: **`node_modules/` and `dist/` are committed to the repo.** Don't hand-edit `dist/` — it's build output that happens to be tracked; avoid touching `node_modules/` diffs.
- `@g-loot/react-tournament-brackets` is a dependency but is **not used** by the current bracket (there's a local shim type in [src/@types/](src/@types/)); the bracket is hand-rolled.

## Running it locally

One-time: install Node 20+ (`node --version` to check). `node_modules/` is
already committed, so `npm install` is only needed after a `package.json` change.

```powershell
npm run dev      # http://localhost:5173 — hot reload, use this while editing
npm run lint     # eslint
npm run build    # tsc -b && vite build — run before pushing
npm run preview  # serves dist/ as production would, after a build
```

Leave `npm run dev` running and edit in another window; the browser updates on
save. What updates and how:

- **`src/**` (components, CSS, `tournament.json`, `rules.md`)** — hot-reloaded
  instantly. These are compiled/imported at build time.
- **`public/**` (player JSONs, `groups.json`, images)** — served as static files
  and fetched at runtime, so Vite does **not** hot-reload them. Save the file,
  then **hard-refresh the browser** (Ctrl+Shift+R) to bust the fetch cache. If a
  stat or list edit "isn't showing up", this is why.
- **`src/constants/players.ts`** — hot-reloads, but if a name there has no
  matching `public/players/<Name>.json` the Lists and Leaderboard pages go blank
  (the `Promise.all` rejects). Check the browser console for the failed fetch.

Verifying a change: `/` for the group boxes / bracket, `/lists` for army lists,
`/leaderboard` for stat records, `/rules` for `rules.md`. Routing is
`BrowserRouter`, and `npm run dev` handles the SPA fallback itself — the
[_redirects](_redirects) rewrite only matters in production.

Don't run a build to check a visual change — `dist/` is committed, so a stray
`npm run build` puts unrelated build output in your diff. Use `npm run dev` and
build only when you are about to push.

Deploying: push to `main`; Cloudflare releases from there. Season work lands on
`season2` first.

## Routes

Defined in [src/App.tsx](src/App.tsx); all but Main are `React.lazy`. Every page renders [NavBar](src/components/NavBar.tsx).

| Path | Component | Content |
|---|---|---|
| `/` | [MainPage.tsx](src/components/MainPage.tsx) | Banner images + [TournamentBracket](src/components/TournamentBracket.tsx) |
| `/leaderboard` | [LeaderboardPage.tsx](src/components/LeaderboardPage.tsx) | Best-in-metric honors |
| `/rules` | [RulesPage.tsx](src/components/RulesPage.tsx) | Renders [src/assets/rules.md](src/assets/rules.md) via `?raw` import |
| `/lists` | [ListsPage.tsx](src/components/ListsPage.tsx) | Grid of every player's army list |

## Data model — where the truth lives

Two distinct data sources drive everything:

1. **`public/players/<Name>.json`** — the live per-player record. Fetched **at runtime** over HTTP
   (`fetch('/players/<Name>.json')`) by ListsPage, LeaderboardPage, and TournamentBracket.
   Shape (see [src/types.ts](src/types.ts)): `name`, `army` (short faction/detachment label),
   `list` (raw army-list text with `\n`s),
   `winrate`, `mostEnemiesKilled`, `greatestPointsDifference`, `highestScore`, plus optional
   `mostPointsInRound`, `shortestGame`, `shortestTurn` (`"HH:MM:SS"` / `"MM:SS"` strings).
2. **[src/tournament/tournament.json](src/tournament/tournament.json)** — the bracket, **imported at build time**.
   A recursive tree rooted at `{"name":"Champion"}`: each node has `name`, `winner`, optional
   `children[]` (leaves = seeded first-round players). The tree is stored **inverted** — children
   are the earlier-round matches feeding a node.

**[src/constants/players.ts](src/constants/players.ts)** holds `PLAYER_NAMES` — the single roster list
(currently the 12 players of the group-stage season; Rhys is TO and not playing).
Every runtime fetch loops over it, so **a name here without a matching `public/players/<Name>.json`
breaks the Lists and Leaderboard pages** (they `throw` on a non-OK response and the whole
`Promise.all` rejects).

### Stale / non-served files — do not edit these expecting effect
- **`src/players/*.json` + `src/players/index.ts`** — an older build-time copy of the roster. Nothing imports it. `public/players/` is authoritative.
- **`public/players/index.ts`** — an unused `loadPlayers()` helper (and it's a `.ts` file sitting in `public/`, so it ships as a raw asset).
- **`public/lists.md`, `public/players/lists.md`** — scratch pads where submitted lists get pasted (e.g. the "Season 2 lists" commit) before being transcribed into player JSON. Not fetched by any page. `public/lists.md` was the seeding source for the current 12 player JSONs: authoritative for *who submitted what*, but only the player JSONs are served.
- **`public/backup_players/`, `src/assets/backup_images/`** — archive.

## How the app is normally updated

Commits are almost all data edits, one event per commit (see `git log`: "Legend beat Nate",
"Noah takes high score"):

- **Match result** → edit the relevant node's `winner` (and the parent node's `name` to advance the
  player) in `src/tournament/tournament.json`.
- **Stat record** → edit the field in `public/players/<Name>.json`.
- **New/changed army list** → edit `list` in `public/players/<Name>.json` (embedded `\n`, rendered in a `<pre>`).
- **Rule change** → edit `src/assets/rules.md` (markdown; commented-out lines are open questions/retired rules).
- **New player** → add to `PLAYER_NAMES` *and* create `public/players/<Name>.json` *and* place them in the bracket.

Current work is on branch `season2` (default/deploy branch is `main`). The new season
replaces the bracket with a round-robin group stage — see
[docs/planning/groupstage-mainpage-refactor.md](docs/planning/groupstage-mainpage-refactor.md).

## Component notes

- **TournamentBracket** renders the tree recursively (`Match` component), showing `winner || name || '?'`, with a CSS hover card showing that player's `list`. Styling in [TournamentBracket.css](src/components/TournamentBracket.css) is hand-tuned and per the README currently assumes ~8-player shape.
- **LeaderboardPage** declares a `metrics` array (label/unit/`isPercent`/`isTime`) and computes the max per metric; ties render as **"Contested"**, an all-zero/empty metric as **"Unclaimed"**. `isTime` metrics are min-of-seconds via `timeStringToSeconds`. Known gap (README backlog): a Contested entry hides the value.
- **ListsPage.css** is shared: LeaderboardPage imports it too, and both pages reuse the `.main-bg` / `.bracket-container` classes from [MainPage.css](src/components/MainPage.css).
- **[Tooltip.tsx](src/components/Tooltip.tsx)** is a portal tooltip that is currently unused.

## Gotchas

- The README's lower half is the owner's personal 40k math/tactics notes, not project docs.
- Runtime fetch paths are absolute (`/players/...`), which is why `base: '/'` in [vite.config.ts](vite.config.ts) and root-domain hosting matter.
- `src/players/index.ts` and `src/types.ts` both define a `Player` interface; components import from `src/types.ts`.

## Commenting rules

1. **Describe role, not rationale.** A comment says what part the code plays in the program; it does not justify why the design was chosen.
2. **Be brief.** Doc comments are 2 sentences or less. A comment on a specific line is 1 line, max.
3. **Comment sparingly.** Only complex or essential code gets a comment — obvious code gets none. Function doc comments are the exception and are always welcome.

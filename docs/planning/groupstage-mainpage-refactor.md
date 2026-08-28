# Planning: Replace the Main Page Bracket with a Group Stage View

Status: §3 (roster + player JSON reseed) **done**; §4-§8 still to build.
Branch to work on: `season2`
Scope: `/` (MainPage) only. `/leaderboard`, `/rules`, `/lists` keep their current
behaviour, though both read the player JSONs that §3 rewrote.

## 1. Goal

The new season opens with a group stage: players are split into groups of 4 and
play round-robin inside their group. The main page must stop rendering the
single-elimination bracket and instead render one box per group, each listing its
4 players with army, record, and score.

## 2. What exists today

| Piece | Role today | Fate |
|---|---|---|
| [MainPage.tsx](../../src/components/MainPage.tsx) | Banners + `.main-bracket-container` wrapping `<TournamentBracket />` | Edited: swaps the child component |
| [MainPage.css](../../src/components/MainPage.css) | `.main-bg`, `.main-content` flex row, `.marine-img`, `.main-bracket-container` | Edited: sticky banners, page must be allowed to grow |
| [TournamentBracket.tsx](../../src/components/TournamentBracket.tsx) | Recursive `Match` tree from `tournament.json`, fetches all players for hover lists | **Kept on disk, no longer imported by MainPage** (needed again for the playoff bracket after groups conclude) |
| [src/tournament/tournament.json](../../src/tournament/tournament.json) | Inverted bracket tree, build-time import | Left in place, stale until playoffs |
| [public/players/](../../public/players/) | Runtime-fetched per-player records | **Already reseeded** for the new season with an added `army` field (§3) |
| [src/constants/players.ts](../../src/constants/players.ts) | `PLAYER_NAMES` roster | **Already cut to the 12 season players** (§3) |
| [public/lists.md](../../public/lists.md) | Scratch pad where submitted lists are pasted | Now the seeding source for the player JSONs (§3); still not fetched by any page |

Reused as-is: the `PLAYER_NAMES` + `fetch('/players/<Name>.json')` loop, and the
`<pre>{player.list}</pre>` hover-card idea, both from `TournamentBracket`.

## 3. Roster — resolved, and already done

**Decided:** 12 players, 3 groups of 4, colours Blue / Red / Green. Rhys is the
TO and does not play.

`public/lists.md` is the authority for who is in the season: it holds 13 `Name:`
sections, 12 players plus Rhys. The player JSONs and `PLAYER_NAMES` have been
regenerated from it (this part of the plan is **complete**, see the note below);
everything from §4 onward is still to build.

### 3.1 The season roster

| In (12) | |
|---|---|
| Ayden | Astra Militarum — Combined Arms / Designation Force |
| EvilIan | Adeptus Mechanicus — Haloscreed Battleclade |
| Francisco | Ultramarines — Gladius Task Force |
| Gabe | Blood Angels — The Blood Host |
| Herbert | *(no list submitted yet)* |
| Hugo | Ultramarines — Gladius Task Force |
| Ian | Chaos Knights — Houndpack Lance / Iconoclast Fiefdom |
| James | *(no list submitted yet)* |
| Legend | Leagues of Votann — Needgâard Oathband |
| MattG | Blood Angels — Bastion Task Force |
| Nate | Tyranids — Ambush Predators / Synaptic Nexus |
| Roman | Chaos Space Marines — Pactbound Zealots |

Turnover against last season's 16-name `PLAYER_NAMES` is larger than "4 drop
out": **7 out** (Ben, DadMatt, Emerson, Keivahn, Mitch, Noah, and Rhys, who moves
to TO) and **3 in** (Herbert, Hugo, EvilIan).

### 3.2 What the regeneration did

- **Deleted** all 16 previous `public/players/*.json`. They remain in git
  history, and the last-season copies are also still in `public/backup_players/`.
- **Created** 12 new `public/players/<Name>.json`, one per player above, with
  `list` transcribed from that player's fenced block in `public/lists.md`
  (newlines escaped as `\n`, non-ASCII preserved — the lists contain `•`, `◦`,
  and `â`) and the new `army` label from the table above.
- **Reset every stat field to 0** (`winrate`, `mostEnemiesKilled`,
  `greatestPointsDifference`, `highestScore`, `mostPointsInRound`) and the time
  fields to `""`. New season, no records yet. Consequence: `/leaderboard` shows
  every metric as **"Unclaimed"** until the first result is entered. That is the
  correct state, not a bug.
- **Rewrote `src/constants/players.ts`** to the 12 names. This was mandatory,
  not optional: ListsPage and LeaderboardPage `throw` on a non-OK fetch inside a
  `Promise.all`, so leaving a deleted player in `PLAYER_NAMES` would blank both
  pages.
- `Herbert.json` and `James.json` have `list: ""` and `army: ""` because their
  `public/lists.md` sections are empty. Fill both in when they submit. `army`
  cannot be derived from `list` automatically — the 12 submitted lists come from
  four different exporters with four different header formats — so it is written
  by hand at the same time.

The generator script is not kept in the repo; `public/lists.md` → player JSON is
a one-time seeding step per season, and from here on player JSONs are edited
directly (see §9).

## 4. Data model

### 4.1 New file: `public/groups.json` (runtime-fetched)

Group membership and results are relationships *between* players, not properties
of one player, so they get their own file. Keeping it in `public/` matches how
player data already loads, and means a result is a one-file commit.

```json
{
  "groups": [
    {
      "id": "A",
      "name": "Group A",
      "color": "blue",
      "players": ["Ayden", "Gabe", "Nate", "Roman"],
      "matches": [
        { "round": 1, "p1": "Ayden", "p2": "Gabe",  "p1Games": 2, "p2Games": 1 },
        { "round": 1, "p1": "Nate",  "p2": "Roman", "p1Games": 0, "p2Games": 0 }
      ]
    },
    {
      "id": "B", "name": "Group B", "color": "red",
      "players": ["EvilIan", "Francisco", "Hugo", "Ian"],
      "matches": []
    },
    {
      "id": "C", "name": "Group C", "color": "green",
      "players": ["Herbert", "James", "Legend", "MattG"],
      "matches": []
    }
  ]
}
```

A match with `p1Games === 0 && p2Games === 0` is treated as **unplayed** and
contributes nothing. Matches are best-of-3, so `1-1` in games is the draw
("tie") case and `2-x` is a win for that side. A group of 4 has 6 matches; the
`round` field only exists to group them for display/ordering.

The membership above is a **placeholder that happens to use all 12 real names** —
the actual draw is the TO's call and is the one thing still outstanding before
this file can be committed for real. Every name in it must appear in
`PLAYER_NAMES` (§3.1), or that player's cell renders with no army and no list.

### 4.2 Derived, not stored: W-T-L and score

**Decided:** `groups.json` holds the results; W-T-L and score are derived from
it. (Rejected alternative, kept for the record: per-player fields like
`roundRobinRound1`.) The reasoning, since it constrains §5 —

Storing the record and score per player means the record and score per player: a single match
a single match result has to be written into two files consistently, and this
repo already has a stale-duplicate-data problem (`src/players/` vs
`public/players/`). So `groups.json` is the only truth for results, and the page
computes per player:

- `wins` / `ties` / `losses` — from every played match the player appears in.
- `score` — league points, `3 * wins + 1 * ties`. Multipliers live in one
  exported constant so the house rule changes in one place. If the league instead
  scores by *games won*, that is a one-line change to the same reducer.

Displayed record string: `` `${wins}-${ties}-${losses}` ``.

Nothing about W-T-L or score goes into `public/players/*.json`; those files stay
identity + list + season stat records, exactly as §3 reseeded them.

### 4.3 `public/players/<Name>.json` — the `army` field (already added)

Every file now looks like this; `army` is new, the rest is the pre-existing
shape with the season's stats zeroed:

```json
{
    "name": "Ayden",
    "army": "Astra Militarum — Combined Arms / Designation Force",
    "list": "+++++++++++++++++++++++++++++++++++++++++++++++
+ FACTION KEYWORD: ...",
    "winrate": 0,
    "mostEnemiesKilled": 0,
    "greatestPointsDifference": 0,
    "highestScore": 0,
    "mostPointsInRound": 0,
    "shortestGame": "",
    "shortestTurn": ""
}
```

`army` is the short faction/detachment label shown under the player name. It
can't be reliably parsed out of `list` (the 12 lists come from four different
exporters), so it is written by hand whenever the list changes. `PlayerCell`
falls back to rendering nothing when it is `""` — which is the current state for
Herbert and James.

### 4.4 `src/types.ts`

```ts
export interface Player {
    name: string;
    list: string;
    army?: string;          // NEW - short faction/detachment label
    winrate: number;
    // ...existing stat fields unchanged
}

export interface GroupMatch {
    round: number;
    p1: string;
    p2: string;
    p1Games: number;
    p2Games: number;
}

export type GroupColor = 'blue' | 'red' | 'green';

export interface Group {
    id: string;
    name: string;
    color: GroupColor;
    players: string[];
    matches: GroupMatch[];
}

/** A player's computed round-robin position within their group. */
export interface Standing {
    name: string;
    wins: number;
    ties: number;
    losses: number;
    score: number;
}
```

The existing unused `Match` / `Tournament` interfaces stay for the bracket.

## 5. Components

### 5.1 New: `src/components/GroupStage.tsx`

Replaces `<TournamentBracket />` inside MainPage.

1. On mount, `fetch('/groups.json')` **and** the player map (the same
   `PLAYER_NAMES.map(fetch)` loop already in `TournamentBracket` — keep its
   tolerance of a missing file returning `null`, rather than the throwing
   version ListsPage uses, so one bad filename can't blank the front page).
2. Compute standings per group with a pure helper `computeStandings(group)` in
   `src/utils/standings.ts`, so it is testable and reusable by a future
   playoff-seeding view. Sort by `score` desc, then `wins` desc, then name.
3. Render one `<GroupBox />` per group, vertically stacked.

States: a `.group-stage-loading` line until `groups.json` resolves; a group with
no players renders its box with 4 empty slots so the layout is stable before the
draw.

### 5.2 New: `src/components/GroupBox.tsx`

Props: `group`, `standings`, `playersByName`. Renders the coloured, shadowed box:
a header with `group.name`, then a 2x2 grid of `<PlayerCell />`. Colour is
applied via `data-color={group.color}` so every colour value lives in CSS rather
than inline styles.

### 5.3 New: `src/components/PlayerCell.tsx`

Props: `standing`, `player?`. Renders name, `player?.army`, the `W-T-L` string,
and the score. Owns the hover behaviour: on hover the cell gains the white glow
and reveals its list card (`<pre>{player.list}</pre>`).

Hover is pure CSS (`:hover` / `:focus-within`), as the current bracket does — no
React state, no re-render on mouse move. Add `tabIndex={0}` so the glow and list
are keyboard-reachable too.

## 6. Styling — `src/components/GroupStage.css`

New stylesheet imported by `GroupStage.tsx`. Nothing from
`TournamentBracket.css` is reused; it is bracket-geometry specific.

**Static banners, scrolling groups.** `.main-content` is already a flex row of
`[left banner][content][right banner]`. Give the banners
`position: sticky; top: <navbar height>; align-self: flex-start` and let the
middle column grow past the viewport. That is preferable to making the middle
column an internally-scrolling `overflow-y: auto` box, which yields a nested
scrollbar and breaks the `.main-bracket-container` background. Two existing
rules must change for the page to be able to grow at all:

- `.main-bg` currently sets **both** `height: 100vh` and `min-height: 100vh` —
  drop the `height`.
- `.main-content` `align-items: center` becomes `flex-start`.

**Group box** — 4 cells in a 2x2 grid gives each player a quarter of the box:

```css
.group-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1.5rem;
    margin: 0 auto 2.5rem;
    max-width: 1100px;
    border: 3px solid var(--group-color);
    border-radius: 16px;
    background: rgba(24, 26, 36, 0.85);
    box-shadow: 0 8px 28px #000b, 0 0 18px var(--group-glow);
    overflow: visible;              /* hover cards must not be clipped */
}

.group-box[data-color='blue']  { --group-color: #4aa3ff; --group-glow: #4aa3ff40; }
.group-box[data-color='red']   { --group-color: #ff5a5a; --group-glow: #ff5a5a40; }
.group-box[data-color='green'] { --group-color: #57d977; --group-glow: #57d97740; }
```

The group title spans both columns (`grid-column: 1 / -1`). A
`@media (max-width: 720px)` rule collapses to one column and hides the banners.

**Player cell hover glow:**

```css
.player-cell {
    position: relative;
    padding: 0.9rem 1rem;
    border-radius: 10px;
    background: rgba(40, 42, 58, 0.6);
    transition: box-shadow 160ms ease, background 160ms ease;
}

.player-cell:hover,
.player-cell:focus-within {
    background: rgba(52, 55, 74, 0.75);
    box-shadow: 0 0 14px 4px rgba(255, 255, 255, 0.45);
}
```

**List card.** Hidden by default (`opacity: 0; visibility: hidden`), revealed on
cell hover/focus, absolutely positioned against the cell. Two hazards inherited
from the current bracket's hover card:

- Do **not** copy `.main-bracket-container`'s `overflow: hidden` onto any
  ancestor of a cell, or the card is clipped.
- Lists are long: give the card `max-height: 60vh; overflow-y: auto` and a high
  `z-index` so it paints above the boxes below it.

## 7. Files touched

Already done (§3)
- `public/players/*.json` — 16 deleted, 12 created with `army` and zeroed stats
- `src/constants/players.ts` — `PLAYER_NAMES` cut to the 12 season players

Added
- `docs/planning/groupstage-mainpage-refactor.md` (this file)
- `public/groups.json`
- `src/components/GroupStage.tsx`
- `src/components/GroupStage.css`
- `src/components/GroupBox.tsx`
- `src/components/PlayerCell.tsx`
- `src/utils/standings.ts`

Modified
- `src/components/MainPage.tsx` — import `GroupStage` instead of `TournamentBracket`
- `src/components/MainPage.css` — sticky banners, drop `height: 100vh`, `align-items: flex-start`
- `src/types.ts` — `army?`, `Group`, `GroupMatch`, `GroupColor`, `Standing`

Deliberately untouched: `src/tournament/tournament.json`,
`TournamentBracket.tsx/.css`, `src/players/`, `public/backup_players/`, and
`dist/` (committed build output, regenerated by `npm run build`).

## 8. Implementation order

0. ~~Roster + player JSON reseed~~ — **done** (§3).
1. Get the actual group draw from the TO (the last blocker on real data).
2. `src/types.ts` additions + `src/utils/standings.ts` with the scoring constant.
3. `public/groups.json` with the real draw, all matches `0-0`.
4. `PlayerCell` → `GroupBox` → `GroupStage`, then `GroupStage.css`.
5. Swap the component in `MainPage.tsx`; fix the `MainPage.css` scroll/sticky rules.
6. `npm run lint && npm run build`, then `npm run dev` (see the "Running it
   locally" section of [CLAUDE.md](../../CLAUDE.md)) and check: boxes stack and
   scroll, banners stay put, hover glow + list card render unclipped, narrow
   viewport falls back to one column.
7. Fill in `list` + `army` for Herbert and James once they submit.

## 9. Maintenance after this lands

The one-event-per-commit habit survives; only the target file changes.

- **Match result** → edit that match's `p1Games`/`p2Games` in
  `public/groups.json`. Record and score update themselves.
- **List change** → `list` and `army` in `public/players/<Name>.json`. Rules cap
  each player at one list change per season, so this is rare. `public/lists.md`
  stays the paste-in scratch pad but is no longer read by anything after seeding
  — if you edit it, transcribe into the player JSON or nothing changes on the
  site.
- **Stat record** (highest score, shortest game, …) → unchanged: the field in
  `public/players/<Name>.json`, which `/leaderboard` reads.
- **Groups conclude** → rebuild `src/tournament/tournament.json` with the
  qualifying seeds and render `<TournamentBracket />` below `<GroupStage />` on
  the main page. The two coexist; the bracket component needs no changes.

## 10. Risks

- **Name mismatch.** A name in `groups.json` that is missing from `PLAYER_NAMES`
  (or from `public/players/`) yields a cell with no army and no list.
  `computeStandings` is driven by `group.players`, and a dev-only `console.warn`
  should flag unknown names. Note the new roster has both `Ian` and `EvilIan` —
  easy to typo, and a mistake there is silent.
- **Empty lists.** Herbert and James have `list: ""`, so their hover card would
  render an empty `<pre>`. `PlayerCell` should skip the card entirely when
  `list` is empty rather than showing a blank box.
- **Hover on touch devices.** There is no hover, so the list is unreachable.
  Out of scope, but `:focus-within` + `tabIndex` makes tap-to-focus a partial
  fallback.
- **Shared CSS.** `.main-bg` and `.bracket-container` are also used by ListsPage
  and LeaderboardPage, so the `height: 100vh` removal affects every page. It is
  a loosening (long pages there can only improve), but verify `/lists` and
  `/leaderboard` after the change.

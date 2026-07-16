# Designer OS

React + TypeScript + Vite recreation of the `Designer OS.dc.html` design reference (see the original handoff `README.md` in the design bundle for full spec).

## Getting started

Requires Node.js (18+) and npm — neither is currently installed on this machine, so this project has not yet been installed or run.

```
npm install
npm run dev
```

## Structure

- `src/data/` — articles, tools, quotes, gradient palette (static placeholders; swap `articles.ts` for a real RSS-backed fetch in production, per the original handoff notes)
- `src/hooks/` — `useLocalStorage`, `useTheme` (persist theme/saved/favs to `localStorage`, matching the original prototype's keys: `dos_theme`, `dos_saved`, `dos_favs`)
- `src/components/` — `Header`, `GreetingStrip`, `NewsSection` (+ `CategoryChips`, `NewsCard`), `ToolsSection` (+ `ToolCard`), `Footer`
- `src/App.tsx` — page shell wiring theme + saved/favourite state into the sections

# Earthform

Earthform turns complex geospatial and environmental capability into clear, adopted, commercially strong digital products. This repository contains the public Earthform landing page and its reusable coded design system.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Use a different port with `npm run dev -- --port 3001` when needed.

## Commands

```bash
npm run typecheck
npm test
npm run build
npm start
```

Development and build use Next.js webpack mode to avoid the inherited Turbopack process-port failure observed in this workspace.

## Structure

```text
app/                 Route composition, metadata, and content
docs/                Local product brief
design-system/       Tokens, components, canonical index, and routed contracts
public/assets/       Approved local Figma exports
tests/               Landing and design-system contract tests
```

Read `AGENTS.md` before making changes. The canonical semantic contract in `design-system/design.md` routes to the relevant foundation, component, and experience documents. Update only the affected contract and focused parity tests for micro corrections; use a DDR only for consequential new direction.

# Earthform Agent Briefing

Earthform is a Next.js public website and coded design system. When this repository is nested inside GAIDE, read the workspace-level `AGENTS.md` first.

## Load Context Selectively

- Product strategy, audience, content, brand voice, domain constraints, or new experience direction: read `docs/product-brief.md`.
- Design-system work: start at `design-system/design.md` and load only the routed foundation, component, or experience contract involved.
- Implementation: inspect the affected component, styles, tests, and relevant approved Figma node.
- Historical rationale: read only the ADR or DDR referenced by the active contract.

Do not read every product or design document for a mechanical code change.

- **Design-system contract:** `design-system/design.md` is the canonical index for routed implementation contracts and tests.

## Stack And Commands

- TypeScript 5.7.3, Next.js 16.3 App Router, React 19.2.
- Native CSS tokens and CSS Modules; no Tailwind or runtime UI library.
- `app/` owns routes and content; `design-system/` owns reusable UI; `public/assets/` owns approved local exports; `tests/` owns contracts.
- Package manager: npm.

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
npm start
```

From the GAIDE root, use `./init.sh earthform --quick` during iteration and `./init.sh earthform --full` before high-risk completion or release.

## Implementation Rules

- Preserve the approved Figma direction and existing component API unless the change explicitly revises them.
- Reuse semantic tokens and public components before adding raw values or parallel abstractions.
- Keep code, the relevant routed design-system document, and meaningful parity tests synchronized.
- A Figma parity correction to an existing rule is `micro`; a reusable new visual rule or direction is at least `standard` and may require a DDR.
- Use approved local assets. Never persist expiring Figma MCP asset URLs.
- Target current evergreen desktop/mobile browsers and WCAG 2.2 AA.
- Check real content, long labels, overflow, keyboard focus, reduced motion, and the responsive states affected by the change.
- Do not add mapping, data, auth, analytics, CRM, hosting, or observability providers without an approved standard/high-risk contract and relevant decision record.

## Product Guardrails

Earthform must remain decision-first, technically rigorous, calm, and trustworthy. Do not turn it into a generic map-first dashboard, fabricate results or environmental claims, expose sensitive territorial/client data, or imply certainty unsupported by evidence. The full product contract and open decisions live in `docs/product-brief.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

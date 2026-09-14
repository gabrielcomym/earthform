# Earthform Public Design System

> **Status:** implemented
> **Version:** 1.2
> **Scope:** Earthform public brand and editorial interfaces
> **Executable sources:** `tokens.css`, `styles.module.css`, `components/`, and `index.ts`
> **Figma:** file `v6MJtDY9WJeiaBrw7lLrZq`, landing `22:1157`, components `32:168`, system page `24:4`

This is the canonical index for Earthform's implemented public design system. Load only the contract relevant to the active task:

| Need | Read |
| --- | --- |
| Palette, typography, spacing, radii, containers, motion, imagery, or breakpoints | [`docs/foundations.md`](docs/foundations.md) |
| Public exports, component APIs, geometry, variants, and component states | [`docs/components.md`](docs/components.md) |
| Cross-component interaction, accessibility, page composition, content, and contribution rules | [`docs/experience.md`](docs/experience.md) |

The public system serves Earthform's consultancy website. It is not the default system for future dashboards, maps, field tools, or operational products; those require separate product and design decisions.

## Authority

At repository rest, executable code and the routed contracts must agree.

1. `tokens.css`, component TypeScript, `styles.module.css`, and `index.ts` define executable behavior.
2. Accepted ADRs and DDRs define durable rationale and approval boundaries.
3. Inspectable Figma components and frames define approved visual intent.
4. The routed documents mirror implemented semantics without duplicating code.

For drift, correct the affected contract. For a micro parity correction, update code, focused tests, and only the relevant routed document. A new reusable rule or direction is a standard/high-risk change and may require a DDR.

## Decisions

- Foundation: `docs/ddr/0004-earthform-public-design-system.md`
- Motion: `docs/ddr/0010-earthform-subtle-motion-language.md`, `docs/ddr/0012-earthform-element-motion-choreography.md`, `docs/ddr/0015-earthform-smooth-anchor-navigation.md`, `docs/ddr/0017-earthform-soft-reveal-motion.md`, `docs/ddr/0018-earthform-diagonal-reveal-motion.md`
- Surfaces and composition: `docs/ddr/0011-full-bleed-footer-surface.md`, `docs/ddr/0013-earthform-hero-media-full-bleed.md`, `docs/ddr/0014-earthform-service-card-dark-gray-surface.md`, `docs/ddr/0016-earthform-cta-internal-spacing.md`
- Stack: `docs/adr/0006-earthform-web-stack.md`

## Update Rule

Import through `@/design-system`, reuse existing tokens/components, and keep the changed code, focused contract tests, and relevant routed document synchronized. Never load or rewrite all design documentation for a narrow component correction.

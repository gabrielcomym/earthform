# Earthform Design System

The executable design system for Earthform's public website. It translates the approved Figma file into reusable React components and native CSS tokens.

## Sources

- Landing composition: Figma node `22:1157`.
- Component showcase: Figma node `32:168`.
- Design-system page and component definitions: Figma page node `24:4`.
- Canonical semantic contract: `design.md` (a concise index routing to `docs/`).
- Durable decision: root `docs/ddr/0004-earthform-public-design-system.md`.

At repository rest, implementation and the routed contracts must agree. Code defines executable behavior; `design.md` tells contributors which focused document to load. A micro correction updates only the affected contract and focused tests; a consequential reusable change may also require a DDR.

## Usage

Import public components from the barrel:

```tsx
import { Button, SectionHeader, ServiceCard } from '@/design-system'
```

Tokens load globally through `app/globals.css`. Components own their structural styles in `styles.module.css`; page files should compose components rather than recreate their markup.

## Public exports

- `Button`: `primary`, `secondary`, and `ghost`; renders a link when `href` is supplied and a button otherwise.
- `NavLink`, `Logo`, `Navbar`, `Footer`.
- `HeroSection`, `TextSection`, `SectionHeader`.
- `ServiceCard`, `ServicesSection`.
- `TeamMemberCard`, `LeadershipSection`.
- `ImageBanner`: `hero`, `full`, and `grid` variants.
- `CtaSection`.

## Contribution rules

- Use semantic tokens; do not repeat raw design values in component JSX.
- Preserve weights 400 and 500 only.
- Reuse an existing component before adding another visual contract.
- Add states, responsive behavior, tests, and documentation with every component change.
- Keep the routed foundation, component, or experience contract synchronized with implementation.
- Use locally committed approved assets. Never commit an expiring Figma MCP URL.
- A reusable visual-language change requires a DDR.

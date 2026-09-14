# Earthform Experience Contract

Read for cross-component states, motion, accessibility, composition, content, or contribution behavior.

## Interaction-state matrix

| Element | Default | Hover | Focus-visible | Active | Disabled / closed |
| --- | --- | --- | --- | --- | --- |
| NavLink | Primary text | Opacity 0.76 and 1px lift over 180ms | 2px orange outline, 4px offset | Opacity 0.52 | Not implemented |
| Button | Variant surface | Opacity 0.78 and 1px lift over 180ms | 2px orange outline, 4px offset | Opacity 0.58 | Opacity 0.42; no transform; not-allowed cursor |
| Mobile menu | Menu, panel absent | Native text behavior | Orange outline | Fechar, panel visible | Link selection closes panel |
| Language option | Active language full opacity and underline; inactive language opacity 0.52 | 1px lift and inactive opacity 0.78 over 180ms | 2px orange outline, 4px offset | `aria-pressed` updates and copy synchronizes | Reduced motion removes transform/transition |
| Local media | Surface-matched stable frame | Not interactive | Not applicable | Not applicable | Native Next/browser fallback |

## Entrance And Scroll Motion

- Navbar, Hero, and hero media enter once over 600ms with 0/96/192ms sequencing.
- `MotionObserver` reveals marked labels, headings, copy, cards, profiles, non-critical banners, CTA content, and Footer items once in reading order.
- Reveals use opacity, a 20px settle, and an alpha-only soft mask that travels diagonally from lower-left to upper-right before being removed entirely at the final frame; media frames may settle from `1.015` without changing crop.
- The observer begins at 8% intersection with a 4% lower viewport margin so a reveal completes as content reaches its reading position.
- Progressive enhancement is mandatory: without JavaScript or `IntersectionObserver`, content stays visible. Reversed scrolling never hides or replays a completed item.
- Under `prefers-reduced-motion: reduce`, reveal, mask, scale, and transform feedback is removed.
- Initial page load uses manual scroll restoration and returns to the top when no hash target is present; loading never advances the page automatically.
- Same-page navigation uses 720ms eased scrolling only after explicit activation; reduced motion is instant.
- Language selection is controlled by the landing page, starts in Portuguese on each fresh load, and updates both selectors and all visible landing copy without persistence.
- Language changes re-run the reveal observer so translated cards and sections cannot remain hidden after the content reflows.
- English content uses UK spelling and idiomatic professional copy, including `prioritise`, `colours`, and `rigour`.

## Accessibility

- Target WCAG 2.2 AA with semantic landmarks/headings, logical `h1`/`h2`/`h3`, labeled sections, distinct nav labels, visible focus, 44px navigation targets, and 48px Buttons.
- Do not use color or spatial imagery as the only carrier of meaning.
- Use meaningful alt text for content media and empty alt for decorative/adjacent identity portraits.
- Remove non-essential motion under reduced motion.
- Maintain 320px minimum support and zero horizontal overflow. Language options retain 44px targets despite their compact visual label.

## Landing Composition

Navbar → HeroSection → hero ImageBanner → Tese TextSection → Método ServicesSection → Assessoria LeadershipSection → Atuação TextSection → grid ImageBanner → CtaSection → Footer.

This proposition/evidence/explanation/capabilities/domain/leadership/media/action/close sequence is a current composition, not a mandatory module count for future pages.

## Content And Trust

Use clear Brazilian Portuguese and direct, evidence-led language. Do not invent clients, outcomes, impact, precision, compliance, coverage, or contact details. Distinguish evidence, inference, model output, and recommendation. Preserve approved Figma copy unless an orthographic correction leaves meaning intact.

## Do

- Use semantic tokens, Inter 400/500, one orange accent, documented type/rhythm, local approved assets, stable ratios, full-bleed surface/capped-content composition, and existing exports.
- Use surface shifts instead of decorative elevation, 180ms direct-feedback motion, and 600ms narrative-reveal motion.
- Document only the affected component/foundation/experience contract and meaningful states.

## Avoid

- No second accent, visible color gradient, shadow, glow, glass, extra type family/weight, parallax, springs, autoplay, repeated exits, layout animation, rounded full-bleed media, decorative Service Card borders, or centered editorial Text Sections. The documented alpha-only reveal mask is motion infrastructure, not a visual gradient. Service Cards use only their documented internal structural divider.
- Do not promote one-off geometry to tokens or force desktop rhythm on mobile.
- Do not treat this public system as an operational map/dashboard system.

## Contribution

1. Load the root and Earthform briefings plus only the routed contract involved.
2. Import through `@/design-system` and reuse an existing token/component first.
3. A micro parity correction updates code, focused tests, and the affected routed document without a DDR or standalone visual report.
4. A reusable new rule or direction uses a standard/high-risk contract and DDR when consequential.
5. Verify material changes in the running UI; keep approved assets local and claims supportable.

Contract tests aggregate this index and its routed documents to protect token/export parity and resolved high-risk values.

## Known Limitations

- Public landing only; no operational/map product system.
- CTA uses `contato@earthform.io`; no CRM, analytics, or form submission.
- Portrait identity is user-approved but not independently verified.
- Mobile navigation lacks Escape/outside-click close.
- Hero uses a fixed heading id and is intended once per page.
- No theme switcher, Storybook, CMS, analytics, or deployment contract.

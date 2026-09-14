# Earthform Component Contracts

Read only the component section involved in the active task. The barrel at `design-system/index.ts` is the supported import boundary.

## Public Exports

| Component | Public types | Source | Semantic root |
| --- | --- | --- | --- |
| `Button` | `ButtonProps`, `ButtonVariant` | `components/Button.tsx` | `a` or `button` |
| `CtaSection` | `CtaSectionProps` | `components/CtaSection.tsx` | `section` |
| `Footer` | `FooterProps` | `components/Footer.tsx` | `footer` |
| `HeroSection` | `HeroSectionProps` | `components/HeroSection.tsx` | `section` |
| `ImageBanner` | `ImageBannerProps` | `components/ImageBanner.tsx` | `figure` |
| `LeadershipSection` | `LeadershipSectionProps` | `components/LeadershipSection.tsx` | `section` |
| `Logo` | `LogoProps` | `components/Logo.tsx` | Next `Image` |
| `MotionObserver` | None | `components/MotionObserver.tsx` | No visual output |
| `Navbar` | `NavbarProps`, `NavigationItem` | `components/Navbar.tsx` | `header` |
| `NavLink` | `NavLinkProps` | `components/NavLink.tsx` | `a` |
| `SectionHeader` | `SectionHeaderProps` | `components/SectionHeader.tsx` | `header` |
| `ServiceCard` | `ServiceCardProps` | `components/ServiceCard.tsx` | `article` |
| `ServicesSection` | `ServicesSectionProps` | `components/ServicesSection.tsx` | `section` |
| `TeamMemberCard` | `TeamMemberCardProps`, `TeamMemberImageCrop` | `components/TeamMemberCard.tsx` | `article` |
| `TextSection` | `TextSectionProps` | `components/TextSection.tsx` | `section` |

## Button

Anchor when `href` is supplied; otherwise button. Variants: `primary`, `secondary`, `ghost`. Shared geometry: 48px minimum height, `14px 28px` padding, pill radius, 16px Medium label. Hover opacity 0.78, active 0.58, orange focus outline, disabled/`aria-disabled` opacity 0.42. Consumers prevent navigation for disabled anchors.

## NavLink

Native anchor props plus required `href`/children. Uses 16px Regular, 44px minimum target, opacity hover/active, and orange focus outline. Same-page hash links use a dependency-free ease-in/ease-out scroll over 720ms, respect `scroll-padding-top`, update hash after arrival, and focus the target. Modified and non-hash clicks remain native; reduced-motion users receive instant movement. Navigation feedback is required even when an older reference omits it.

## Logo

Optional class name. Exact local `/assets/earthform-logo.svg`, `128 x 13px`, priority loaded, alt “Earthform.” Not currently a link.

## MotionObserver

No visual DOM. With JavaScript, `IntersectionObserver`, and normal motion preference, marks `[data-reveal]` once on first entry and unobserves it. Without enhancement or under reduced motion, content stays visible.

## Navbar

`items: readonly NavigationItem[]` where each item has `href` and `label`, plus controlled `language`, `onLanguageChange`, and localized accessible labels. Desktop: transparent 32px three-column grid with logo left, links centered in the middle column, and PT/EN selector anchored right, using 48px gutters and 24px link gap. The selector uses local 16×12 flags, an 8px flag/label gap, 20px option gap, full-opacity underlined active language, and 52% inactive language so the 11px label remains WCAG AA compliant. Mobile at 767px: native Menu/Fechar button with `aria-expanded`/`aria-controls`; selecting a link closes the black, subtly bordered 12px panel. Escape and outside-click close are not implemented.

## Footer

Same controlled navigation and language-selector contract as Navbar. Outer semantic Footer owns full-viewport black surface; centered inner content is fluid to 1400px with 300px minimum height and 48px padding, using the same logo/centered-links/right-selector grid. Mobile stacks identity, two-column links, and language selector with `48px 24px 80px` padding. Breakout cannot increase document width.

## `LanguageSwitcher`

Controlled `language: 'pt' | 'en'` selector with `aria-pressed` buttons and a labeled `role="group"`. Portuguese is the initial landing state; the shared state keeps header, footer, and all landing copy synchronized. Hover lifts the option by 1px and increases inactive opacity; reduced motion removes the transition.

Public types: `Language`, `LanguageSwitcherProps`.

## HeroSection

`title: string`. One semantic section and `h1`, fixed id `earthform-title`, 972px desktop measure, 80px Regular display, 291px desktop minimum. Use once per page.

## TextSection

`label`, `body: ReactNode`, optional `id`. Semantic section, `h2` label, structured body, 32px gap, 972px measure, and 40px / 1 desktop body. On mobile, the body is 28px / 1.2; optional id connects section and heading.

## SectionHeader

`label`, `title: ReactNode`, optional `headingId`. Semantic header, 16px label, 28px Medium primary `h2` at 100% leading, 32px gap, 972px measure.

## ServiceCard

`category` and `description`. Semantic article with a transparent surface, a presentational internal divider, and a copy group whose category is an `h3`. Desktop/tablet: no artificial minimum height, `0 40px 24px 0` padding, a 1px `--color-border-card` divider, 32px divider-to-copy gap, 10px category-to-description gap, 12px radius, 24px white category, and 24px secondary description up to 540px. The zero left padding aligns the divider and copy to the parent grid; the 40px right inset ends the divider before the card edge. Real copy may increase height; same-row cards stretch equally. Mobile retains its 172px minimum and 24px padding, with 21px card copy.

## ServicesSection

Optional `id`, `label`, `title`, `services`. Labeled semantic section, 48px header-to-grid gap, two 457px desktop columns with 48px column and 24px row gaps, and one flexible column on mobile. Categories are unique keys.

## TeamMemberCard

`name`, `role`, `bio`, `imageSrc`, optional `imageAlt`, optional `imageCrop: 'cover'`. Semantic article, square `500px` image using the original square export without enlargement, 8px radius, and 32px image-to-copy gap. A 32px right-inset copy wrapper separates the 4px name-role identity group from the biography by 32px. Name is 20px / 24px; role and biography are 16px / 19px. Empty alt is allowed beside adjacent visible identity.

## LeadershipSection

Optional `id`, `label`, `title`, `members`. The 1400px semantic outer section uses `0 48px`; nested 1304px black panel uses 12px radius, `48px 48px 120px`, and 80px header-grid gap. Header/team grid width 1048px; two 500px columns with 48px gap. Mobile preserves nesting with `0 24px` outside and `32px 24px 80px` inside, one column, and 48px content gap. Approved content uses distinct Pedro/Gabriel assets. Figma master component `32:267` owns this composition.

## ImageBanner

`src`, optional `alt`, `priority`, and optional `variant: 'full' | 'grid' | 'hero'`. `hero` is critical `100vw`, `1400 / 733`, square-cornered, preload/high priority when requested, initial entrance, and no scroll reveal. Critical hero media is excluded from `MotionObserver`. `full` is page-edge and square-cornered. `grid` uses responsive gutters and 12px radius. Full/grid use `1400 / 733`, cover, responsive Next Image sizing, and a surface-matched frame fill so image settling cannot expose a light halo or border. Image frames and rendered images explicitly have no border or outline.

## CtaSection

Optional `id`, title, description, button label/href/target/rel. Centered semantic section with an internal `ctaContent` wrapper at a 986px measure. `ctaTextGroup` has a 32px title-description gap; Button sits 80px below. `ctaContent` owns 120px desktop bottom padding, matching Figma `24:51`, and 80px on mobile. Approved CTA uses `mailto:contato@earthform.io`, `_blank`, and `noreferrer`. No CRM, analytics, or contact-form submission has been approved. Mobile: 44px title, 21px copy, and 24px gutters.

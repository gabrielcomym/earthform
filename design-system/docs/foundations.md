# Earthform Design Foundations

Read this contract for foundation tokens, imagery, material, or responsive behavior.

## Design Character

Earthform uses a dark, grounded language for a geospatial and environmental design consultancy. The near-black surface recedes so satellite imagery, evidence, and editorial typography carry the narrative. The experience should feel measured, precise, technically credible, and unhurried.

- Dark-first `#131313` canvas with pure black contained chapters.
- Earthform Orange `#FF9000` is the only chromatic action/focus signal.
- Inter Regular carries headlines and reading; Medium is reserved for emphasis and actions.
- Selected satellite imagery establishes identity without decorative map chrome.
- Desktop uses a deliberate 240px chapter rhythm so horizontal modules have visible breathing room.
- No gradients, shadows, glow, or decorative borders; structural dividers are reserved for documented component anatomy.
- Square full-bleed media, 8px portraits, 12px contained surfaces, and pill controls.

## Colors

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--color-bg-primary` | `#000000` | Leadership inner panel, full-bleed Footer surface, and mobile menu |
| `--color-bg-surface` | `#131313` | Main page surface and continuous external browser canvas |
| `--color-bg-placeholder` | `#868686` | Stable fallback for components that explicitly use a placeholder; image frames use their surrounding surface during motion |
| `--color-text-primary` | `#e8e8e8` | Primary copy, labels, navigation, and names |
| `--color-text-secondary` | `#b2b2b2` | Supporting copy, section titles, roles, and biographies |
| `--color-text-inverse` | `#ffffff` | Service Card descriptions |
| `--color-text-on-accent` | `#000000` | Primary Button text and selected-text foreground |
| `--color-accent-primary` | `#ff9000` | Primary Button, focus outline, and text selection |
| `--color-border-default` | `#e8e8e8` | Secondary Button border |
| `--color-border-subtle` | `#282828` | Mobile menu structure |
| `--color-border-card` | `#4c4c4c` | Service Card internal divider |

Earthform Orange is not the foreground or fill of every interactive element. Navigation uses primary text with opacity feedback.

## Typography

Inter loads through `next/font/google` in `app/layout.tsx` and is exposed as `--font-inter`.

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--font-sans` | `var(--font-inter), Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif` | Global font family |
| `--font-weight-regular` | `400` | Headlines, editorial copy, labels, navigation, names, roles, and biographies |
| `--font-weight-medium` | `500` | Section titles and Button labels |
| `--type-display-size` | `80px` | Hero and CTA titles on desktop |
| `--type-display-leading` | `1` | Display line height |
| `--type-heading-size` | `28px` | Section Header title |
| `--type-heading-leading` | `1` | Section Header title line height |
| `--type-editorial-size` | `28px` | Text Section body and CTA description |
| `--type-editorial-leading` | `1.36` | Editorial line height |
| `--type-text-section-size` | `40px` | Text Section desktop body |
| `--type-text-section-leading` | `1` | Text Section desktop body line height |
| `--type-card-size` | `24px` | Service Card description |
| `--type-card-leading` | `1.33` | Service Card description line height |
| `--type-name-size` | `20px` | Team member name |
| `--type-body-size` | `16px` | Navigation, labels, categories, roles, biographies, and controls |
| `--type-body-leading` | `1.5` | Body and utility line height |

Use only Regular and Medium. Letter spacing is `0`; optical sizing and synthesis are disabled; utility text stays at least 16px; breakpoint sizes are fixed rather than viewport-scaled.

## Spacing

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--spacing-4` | `4px` | Name-to-role gap |
| `--spacing-8` | `8px` | Available tight primitive |
| `--spacing-10` | `10px` | Service Card category-to-description gap |
| `--spacing-16` | `16px` | Mobile menu offset/padding |
| `--spacing-24` | `24px` | Navigation/grid gap and mobile gutters |
| `--spacing-32` | `32px` | Team Member Card gap, section gap, CTA title-to-description, tablet gutters, mobile Leadership top padding |
| `--spacing-40` | `40px` | Service Card desktop right padding |
| `--spacing-48` | `48px` | Desktop gutters, section/grid gap, Leadership and Footer padding |
| `--spacing-80` | `80px` | CTA text-to-action, Leadership gaps, mobile lower padding |
| `--spacing-120` | `120px` | Desktop Leadership panel and CTA bottom padding |
| `--spacing-128` | `128px` | Mobile section rhythm |
| `--spacing-160` | `160px` | Desktop section rhythm |
| `--spacing-240` | `240px` | Desktop section rhythm between horizontal modules |

Local values not promoted to tokens: Button padding `14px 28px` and desktop top offset `40px`.

## Radii

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--radius-none` | `0` | Full-bleed Image Banner |
| `--radius-sm` | `8px` | Team portraits |
| `--radius-md` | `12px` | Cards, Leadership surfaces, mobile menu, and grid Image Banner |
| `--radius-lg` | `24px` | Available contained-surface primitive |
| `--radius-pill` | `9999px` | Every Button variant |

## Containers And Controls

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--container-page` | `1400px` | Maximum public-page width |
| `--container-grid` | `1304px` | Desktop inner-grid width |
| `--container-text` | `972px` | Hero, Text Section, and Section Header measure |
| `--container-cta` | `986px` | CTA measure |
| `--gutter-page` | `48px` | Desktop horizontal gutter |
| `--section-rhythm` | `160px` | Desktop chapter spacing |
| `--control-height` | `48px` | Button minimum height |

The page is fluid up to `--container-page`. Full-bleed surfaces break out to the viewport while their content stays centered and capped.

## Motion

| CSS token | Value | Implemented use |
| --- | --- | --- |
| `--motion-duration-fast` | `180ms` | Link and Button feedback |
| `--motion-duration-reveal` | `600ms` | Initial and one-time editorial reveals |
| `--motion-easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes and media settling |
| `--motion-easing-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | Page and section entrances |
| `--motion-delay-content` | `96ms` | Reading-order offset after a label or preceding entrance |
| `--motion-delay-stagger` | `120ms` | Repeated-item and Footer sequencing |
| `--motion-reveal-mask-size` | `160%` | Alpha-only soft-mask travel for entrances |

Motion uses composited opacity, transform, and an alpha-only CSS mask: at most 16px on load, 20px on reveal, and `1.015` media scale. The mask travels diagonally from lower-left toward upper-right, is removed completely at the final frame, and never creates a visible color gradient. Motion never animates layout geometry.

## Material And Imagery

Depth comes from `#131313` browser/page surface, `#000000` contained chapters, and `#2c2c2c` cards. Do not add shadow, blur, glow, glass, or gradient.

- Hero media: full-viewport `100vw`, `1400 / 733`, square corners.
- Full media: `1400 / 733`, square corners.
- Grid media: same ratio, responsive gutters, 12px radius.
- Team media: `1 / 1`, 8px radius; original square Photo exports render without enlargement or custom crop.
- Assets live under `public/assets/`; expiring Figma URLs are forbidden.
- Meaningful imagery has descriptive alt text; adjacent identity portraits may use empty alt.
- Critical hero media preloads with high fetch priority; other banners remain lazy by default.

## Responsive Contract

### Desktop: 1024px+

1400px page max, 40px top offset, 240px rhythm, 48px gutter, 80px display type, 291px Hero minimum, two-column Services, two-column Team, 1304px nested Leadership panel, 972px editorial measure, 986px CTA measure, desktop navigation visible.

### Tablet: 768px to 1023px

32px gutters/top offset, 160px rhythm, 56px display type, 250px Hero minimum, two-column Services and Team, 32px grid-media gutters, 720px CTA cap.

### Mobile: 320px to 767px

24px gutters/top offset, 128px rhythm, 44px display type, 220px Hero minimum, 21px editorial/card copy, 24px section titles, one-column Services/Team, Service Cards at 172px minimum with 24px padding, nested Leadership at `0 24px` outside and `32px 24px 80px` inside, 340px CTA minimum, full-bleed stacked Footer, mobile disclosure visible.

All widths preserve source order, stable media ratios, readable measures, and zero horizontal overflow. The 240/160/128px rhythms create visible separation between horizontal modules while preserving the same content structure at every breakpoint.

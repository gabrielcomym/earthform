import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'

const root = new URL('..', import.meta.url).pathname

async function source(path) {
  return readFile(join(root, path), 'utf8')
}

async function designContract() {
  const documents = await Promise.all([
    source('design-system/design.md'),
    source('design-system/docs/foundations.md'),
    source('design-system/docs/components.md'),
    source('design-system/docs/experience.md'),
  ])
  return documents.join('\n')
}

function tokenDeclarations(css) {
  return [...css.matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gm)].map(([, name, value]) => ({ name, value }))
}

function barrelSymbols(barrel) {
  return [...barrel.matchAll(/export\s*\{([^}]+)\}\s*from/g)].flatMap(([, block]) =>
    block.split(',').map((entry) => entry.trim().replace(/^type\s+/, '')),
  )
}

test('landing composes the approved Figma module sequence', async () => {
  const page = await source('app/page.tsx')
  const sequence = [
    '<Navbar',
    '<HeroSection',
    '<ImageBanner',
    '<TextSection',
    '<ServicesSection',
    '<LeadershipSection',
    '<TextSection',
    '<ImageBanner',
    '<CtaSection',
    '<Footer',
  ]

  let cursor = -1
  for (const component of sequence) {
    const next = page.indexOf(component, cursor + 1)
    assert.notEqual(next, -1, `${component} must appear after the previous module`)
    cursor = next
  }
})

test('design-system barrel exports every approved component contract', async () => {
  const barrel = await source('design-system/index.ts')
  const exports = [
    'Button',
    'CtaSection',
    'Footer',
    'HeroSection',
    'ImageBanner',
    'LeadershipSection',
    'Logo',
    'MotionObserver',
    'Navbar',
    'NavLink',
    'SectionHeader',
    'ServiceCard',
    'ServicesSection',
    'TeamMemberCard',
    'TextSection',
  ]

  for (const component of exports) {
    assert.match(barrel, new RegExp(`export \\{ ${component}(?:,| \\})`))
  }
})

test('navigation targets existing semantic sections', async () => {
  const content = await source('app/content.ts')
  const page = await source('app/page.tsx')
  const targets = ['tese', 'metodo', 'assessoria', 'atuacao', 'contato']

  for (const target of targets) {
    assert.match(content, new RegExp(`href: '#${target}'`))
    assert.match(page, new RegExp(`id="${target}"`))
  }
})

test('browser metadata points to the approved local Earthform favicon assets', async () => {
  const layout = await source('app/layout.tsx')

  assert.match(layout, /favicon_earthform\.svg/)
  assert.match(layout, /favicon_earthform\.png/)
  assert.match(layout, /type: 'image\/svg\+xml'/)
  assert.match(layout, /type: 'image\/png'/)
})

test('navigation links use eased same-page anchor scrolling with accessible fallbacks', async () => {
  const [navLink, design] = await Promise.all([
    source('design-system/components/NavLink.tsx'),
    designContract(),
  ])

  assert.match(navLink, /const scrollDurationMs = 720/)
  assert.match(navLink, /function easeInOut\(t: number\)/)
  assert.match(navLink, /window\.requestAnimationFrame\(tick\)/)
  assert.match(navLink, /window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)/)
  assert.match(navLink, /targetElement\.scrollIntoView\(\)/)
  assert.match(navLink, /window\.history\.pushState\(null, '', href\)/)
  assert.match(navLink, /target\.focus\(\{ preventScroll: true \}\)/)
  assert.match(navLink, /event\.metaKey \|\| event\.ctrlKey \|\| event\.shiftKey \|\| event\.altKey/)
  assert.match(navLink, /onClick\?\.\(event\)/)
  assert.ok(design.includes('Same-page hash links use a dependency-free ease-in/ease-out scroll'))
  assert.ok(design.includes('reduced-motion users receive instant movement'))
})

test('language selector defaults to Portuguese and synchronizes the landing copy', async () => {
  const [page, content, switcher, styles] = await Promise.all([
    source('app/page.tsx'),
    source('app/content.ts'),
    source('design-system/components/LanguageSwitcher.tsx'),
    source('design-system/styles.module.css'),
  ])

  assert.match(page, /useState<Language>\('pt'\)/)
  assert.match(page, /landingContent\[language\]/)
  assert.match(content, /Territorial intelligence for decisions that move capital and impact\./)
  assert.match(content, /navigationItems: englishNavigation/)
  assert.match(content, /which risks to take, what to prioritise/)
  assert.match(content, /Territorial image in natural colours/)
  assert.match(content, /products to scalable products|scalable products/)
  assert.match(content, /role: 'Land, Environmental & Geospatial Intelligence'/)
  assert.match(content, /role: 'Product design, strategy and digital experiences'/)
  assert.match(switcher, /BR - Brazil\.png/)
  assert.match(switcher, /GB-UKM - United Kingdom\.png/)
  assert.match(switcher, /aria-pressed=\{isActive\}/)
  assert.match(switcher, /styles\.languageOptionActive/)
  assert.match(styles, /\.languageSwitcher\s*\{[\s\S]*?gap: 20px;/)
  assert.match(styles, /\.languageOption\s*\{[\s\S]*?opacity: 0\.52;/)
  assert.match(styles, /\.languageOptionActive\s*\{[\s\S]*?opacity: 1;[\s\S]*?text-decoration: underline;/)
  assert.match(styles, /\.languageOption:hover\s*\{[\s\S]*?transform: translateY\(-1px\)/)
  assert.match(styles, /\.languageOption\s*\{[\s\S]*?transition:/)
  assert.match(styles, /\.languageOption\s*\{[\s\S]*?transition: none;/)
  assert.match(styles, /\.navbar\s*\{[\s\S]*?display: grid;[\s\S]*?grid-template-columns: minmax\(0, 1fr\) auto minmax\(0, 1fr\);/)
  assert.match(styles, /\.navbar > \.desktopNav\s*\{[\s\S]*?grid-column: 2;[\s\S]*?justify-self: center;/)
  assert.match(styles, /\.navbarControls\s*\{[\s\S]*?justify-self: end;/)
  assert.match(styles, /\.footerInner\s*\{[\s\S]*?display: grid;[\s\S]*?grid-template-columns: minmax\(0, 1fr\) auto minmax\(0, 1fr\);/)
  assert.match(page, /<MotionObserver language=\{language\} \/>/)
  assert.match(await source('design-system/components/MotionObserver.tsx'), /\}, \[language\]\)/)
})

test('button supports all Figma variants and complete visual states', async () => {
  const button = await source('design-system/components/Button.tsx')
  const styles = await source('design-system/styles.module.css')

  assert.match(button, /'primary' \| 'secondary' \| 'ghost'/)
  assert.match(styles, /\.button-primary/)
  assert.match(styles, /\.button-secondary/)
  assert.match(styles, /\.button-ghost/)
  assert.match(styles, /\.button:hover/)
  assert.match(styles, /\.button:active/)
  assert.match(styles, /\.button:focus-visible/)
  assert.match(styles, /\.button:disabled/)
})

test('final CTA opens the approved email contact in a new browsing context', async () => {
  const [page, cta, design] = await Promise.all([
    source('app/page.tsx'),
    source('design-system/components/CtaSection.tsx'),
    designContract(),
  ])

  assert.match(page, /buttonHref="mailto:contato@earthform\.io"/)
  assert.match(page, /buttonTarget="_blank"/)
  assert.match(page, /buttonRel="noreferrer"/)
  assert.match(cta, /buttonTarget\?: string/)
  assert.match(cta, /buttonRel\?: string/)
  assert.match(cta, /target=\{buttonTarget\}/)
  assert.match(cta, /rel=\{buttonRel\}/)
  assert.ok(design.includes('`mailto:contato@earthform.io`'))
  assert.ok(design.includes('No CRM, analytics, or contact-form submission has been approved.'))
})

test('footer surface is full bleed while its content remains grid aligned', async () => {
  const [footer, styles, pageStyles] = await Promise.all([
    source('design-system/components/Footer.tsx'),
    source('design-system/styles.module.css'),
    source('app/page.module.css'),
  ])

  assert.match(
    footer,
    /<footer className=\{styles\.footer\}>[\s\S]*?<div className=\{styles\.footerInner\}>[\s\S]*?<Logo \/>[\s\S]*?<nav/,
  )
  assert.match(styles, /\.footer\s*\{[\s\S]*?width: 100vw;[\s\S]*?margin-left: calc\(50% - 50vw\);[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /\.footerInner\s*\{[\s\S]*?width: min\(100%, var\(--container-page\)\);[\s\S]*?min-height: 300px;[\s\S]*?margin: 0 auto;[\s\S]*?padding: var\(--spacing-48\);/)
  assert.match(styles, /@media \(max-width: 767px\)[\s\S]*?\.footerInner\s*\{[\s\S]*?flex-direction: column;[\s\S]*?padding: var\(--spacing-48\) var\(--spacing-24\) var\(--spacing-80\);/)
  assert.doesNotMatch(pageStyles, /\.page\s*\{[^}]*overflow-x:\s*clip;/)
})

test('all selected Figma assets are committed locally at source resolution', async () => {
  const assets = [
    ['public/assets/earthform-logo.svg', 500],
    ['public/assets/Image Banner Full.png', 1_000_000],
    ['public/assets/Image Module.png', 1_000_000],
    ['public/assets/Photo_Pedro.png', 1_000_000],
    ['public/assets/Photo_Gabriel.png', 1_000_000],
    ['public/assets/BR - Brazil.png', 100],
    ['public/assets/GB-UKM - United Kingdom.png', 100],
  ]

  for (const [path, minimumBytes] of assets) {
    const info = await stat(join(root, path))
    assert.ok(info.size > minimumBytes, `${path} must contain the committed Figma export`)
  }

  const applicationSource = await Promise.all([
    source('app/page.tsx'),
    source('app/content.ts'),
    source('design-system/components/Logo.tsx'),
  ])
  assert.doesNotMatch(applicationSource.join('\n'), /figma\.com\/api\/mcp\/asset/)
})

test('opening satellite media is full bleed, critical, and not scroll-reveal gated', async () => {
  const [page, imageBanner, styles, design] = await Promise.all([
    source('app/page.tsx'),
    source('design-system/components/ImageBanner.tsx'),
    source('design-system/styles.module.css'),
    designContract(),
  ])

  assert.match(page, /src="\/assets\/Image Banner Full\.png"[\s\S]*?variant="hero"/)
  assert.match(imageBanner, /variant\?: 'full' \| 'grid' \| 'hero'/)
  assert.match(imageBanner, /const isHero = variant === 'hero'/)
  assert.match(imageBanner, /const isRevealedOnScroll = !priority && !isHero/)
  assert.match(imageBanner, /data-reveal=\{isRevealedOnScroll \? 'media' : undefined\}/)
  assert.match(imageBanner, /preload=\{priority\}/)
  assert.match(imageBanner, /fetchPriority=\{priority \? 'high' : undefined\}/)
  assert.match(imageBanner, /sizes=\{isHero \|\| variant === 'full' \? '100vw'/)
  assert.match(styles, /\.imageBanner-hero\s*\{[\s\S]*?width: 100vw;[\s\S]*?aspect-ratio: 1400 \/ 733;[\s\S]*?margin-left: calc\(50% - 50vw\);[\s\S]*?animation: enter-up var\(--motion-duration-reveal\)/)
  assert.match(styles, /\.imageBanner\s*\{[\s\S]*?border: 0;[\s\S]*?outline: 0;[\s\S]*?background: var\(--color-bg-surface\);/)
  assert.match(styles, /\.imageBanner img\s*\{[\s\S]*?display: block;[\s\S]*?border: 0;[\s\S]*?outline: 0;/)
  assert.match(styles, /\.teamPhoto\s*\{[\s\S]*?border-radius: var\(--radius-sm\);[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /:global\(html\[data-motion-ready\]\) \.motionReveal\.imageBanner img/)
  assert.ok(design.includes("`variant: 'full' | 'grid' | 'hero'`"))
  assert.ok(design.includes('Critical hero media is excluded from `MotionObserver`'))
})

test('tokens preserve the approved Earthform visual foundation', async () => {
  const tokens = await source('design-system/tokens.css')
  const layout = await source('app/layout.tsx')
  const globals = await source('app/globals.css')
  const packageManifest = JSON.parse(await source('package.json'))

  for (const value of ['#131313', '#ff9000', '#e8e8e8', '#b2b2b2', '160px', '1400px', '972px']) {
    assert.match(tokens, new RegExp(value.replace('#', '\\#')))
  }

  assert.match(layout, /Inter\(\{/)
  assert.match(layout, /variable: '--font-inter'/)
  assert.match(layout, /<html className=\{inter\.variable\}/)
  assert.match(tokens, /--font-sans: var\(--font-inter\), Inter/)
  assert.match(tokens, /--font-weight-regular: 400;/)
  assert.match(tokens, /--font-weight-medium: 500;/)
  assert.match(tokens, /--type-display-leading: 1;/)
  assert.match(tokens, /--motion-duration-fast: 180ms;/)
  assert.match(tokens, /--motion-duration-reveal: 600ms;/)
  assert.match(globals, /font-optical-sizing: none;/)
  assert.match(globals, /font-synthesis: none;/)
  assert.match(globals, /-webkit-font-smoothing: antialiased;/)
  assert.match(globals, /-moz-osx-font-smoothing: grayscale;/)
  assert.doesNotMatch(globals, /text-rendering:\s*optimizeLegibility/)
  assert.match(globals, /html\s*\{[\s\S]*?background: var\(--color-bg-surface\);/)
  assert.match(globals, /body\s*\{[\s\S]*?background: var\(--color-bg-surface\);/)

  assert.equal(packageManifest.dependencies.tailwindcss, undefined)
  assert.equal(packageManifest.dependencies['lucide-react'], undefined)
})

test('canonical design documentation mirrors every implemented token and public export', async () => {
  const [design, tokens, barrel] = await Promise.all([
    designContract(),
    source('design-system/tokens.css'),
    source('design-system/index.ts'),
  ])

  const declarations = tokenDeclarations(tokens)
  const symbols = barrelSymbols(barrel)

  assert.equal(declarations.length, 57)
  assert.equal(symbols.length, 35)

  for (const { name, value } of declarations) {
    assert.ok(
      design.includes(`| \`${name}\` | \`${value}\` |`),
      `${name} must be documented with its exact implemented value`,
    )
  }

  for (const symbol of symbols) {
    assert.ok(design.includes(`\`${symbol}\``), `${symbol} must have a documented public contract`)
  }
})

test('design-system authority is consistent across project entry points', async () => {
  const [design, systemReadme, projectReadme, agents] = await Promise.all([
    designContract(),
    source('design-system/README.md'),
    source('README.md'),
    source('AGENTS.md'),
  ])

  for (const implementationSource of ['tokens.css', 'styles.module.css', 'components/', 'index.ts']) {
    assert.match(design, new RegExp(implementationSource.replace('.', '\\.')))
  }

  for (const approvedReference of [
    '22:1157',
    '32:168',
    '24:4',
    'docs/ddr/0004-earthform-public-design-system.md',
    'docs/adr/0006-earthform-web-stack.md',
  ]) {
    assert.ok(design.includes(approvedReference), `${approvedReference} must remain traceable`)
  }

  assert.match(systemReadme, /Canonical semantic contract: `design\.md`/)
  assert.match(projectReadme, /canonical semantic contract in `design-system\/design\.md`/)
  assert.match(agents, /Design-system contract:[\s\S]*`design-system\/design\.md`/)

  for (const entryPoint of [design, systemReadme, projectReadme, agents]) {
    assert.match(entryPoint, /code|implementation/i)
    assert.match(entryPoint, /test/i)
  }
})

test('canonical contracts protect resolved high-risk design-system values', async () => {
  const [design, tokens, styles, pageStyles, navbar] = await Promise.all([
    designContract(),
    source('design-system/tokens.css'),
    source('design-system/styles.module.css'),
    source('app/page.module.css'),
    source('design-system/components/Navbar.tsx'),
  ])

  assert.match(tokens, /--font-sans: var\(--font-inter\), Inter/)
  assert.match(tokens, /--radius-pill: 9999px;/)
  assert.match(tokens, /--control-height: 48px;/)
  assert.match(styles, /\.button\s*\{[\s\S]*?min-height: var\(--control-height\);/)
  assert.match(tokens, /--color-border-card: #4c4c4c;/)
  assert.match(tokens, /--spacing-40: 40px;/)
  assert.match(tokens, /--type-text-section-size: 40px;/)
  assert.match(tokens, /--type-text-section-leading: 1;/)
  assert.match(tokens, /--type-heading-leading: 1;/)
  assert.match(styles, /\.editorialBody\s*\{[\s\S]*?font-size: var\(--type-text-section-size\);[\s\S]*?line-height: var\(--type-text-section-leading\);/)
  assert.match(styles, /\.sectionTitle\s*\{[\s\S]*?color: var\(--color-text-primary\);[\s\S]*?line-height: var\(--type-heading-leading\);/)
  assert.match(styles, /\.servicesGrid\s*\{[\s\S]*?grid-template-columns: repeat\(2, 457px\);[\s\S]*?column-gap: var\(--spacing-48\);[\s\S]*?row-gap: var\(--spacing-24\);/)
  assert.match(styles, /\.servicesSection\s*\{[\s\S]*?gap: var\(--spacing-48\);/)
  assert.match(styles, /@media \(max-width: 767px\)[\s\S]*?\.servicesGrid\s*\{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/)
  assert.match(styles, /\.serviceCard\s*\{[\s\S]*?gap: var\(--spacing-32\);[\s\S]*?padding: 0 var\(--spacing-40\) var\(--spacing-24\) 0;/)
  const serviceCardBlock = styles.match(/\.serviceCard\s*\{[^}]*\}/)?.[0] ?? ''
  assert.doesNotMatch(serviceCardBlock, /background:/)
  assert.match(styles, /\.serviceCardDivider\s*\{[\s\S]*?height: 1px;[\s\S]*?background: var\(--color-border-card\);/)
  assert.match(styles, /\.serviceCardCopy\s*\{[\s\S]*?gap: var\(--spacing-10\);/)
  assert.match(styles, /@media \(max-width: 767px\)[\s\S]*?\.serviceCard\s*\{[\s\S]*?min-height: 172px;[\s\S]*?padding: var\(--spacing-24\);/)
  assert.match(styles, /\.ctaContent\s*\{[\s\S]*?gap: var\(--spacing-80\);[\s\S]*?padding-bottom: var\(--spacing-120\);/)
  assert.match(styles, /\.ctaTextGroup\s*\{[\s\S]*?gap: var\(--spacing-32\);/)
  assert.match(styles, /@media \(max-width: 767px\)[\s\S]*?\.ctaContent\s*\{[\s\S]*?padding-bottom: var\(--spacing-80\);/)
  assert.match(styles, /\.mobileNavPanel\s*\{[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /\.leadershipPanel\s*\{[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /\.footer\s*\{[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /\.navLink:hover/)
  assert.match(styles, /\.navLink:active/)
  assert.match(styles, /\.navLink:focus-visible/)
  assert.match(styles, /@media \(max-width: 1023px\)/)
  assert.match(styles, /@media \(max-width: 767px\)/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(pageStyles, /@media \(max-width: 1023px\)[\s\S]*?gap: 112px;/)
  assert.match(pageStyles, /@media \(max-width: 767px\)[\s\S]*?gap: 88px;/)
  assert.match(navbar, /aria-controls="mobile-navigation"/)
  assert.match(navbar, /aria-expanded=\{isOpen\}/)
  assert.match(navbar, /isOpen \? closeMenuLabel : menuLabel/)
  assert.match(navbar, /onClick=\{\(\) => setIsOpen\(false\)\}/)

  for (const resolvedContract of [
    '48px minimum height',
    '`0 40px 24px 0` padding',
    '32px divider-to-copy gap',
    '10px category-to-description gap',
    '32px image-to-copy gap',
    '32px title-description gap',
    'Button sits 80px below',
    '120px desktop bottom padding',
    'Tablet: 768px to 1023px',
    'Mobile: 320px to 767px',
    '112/88px responsive rhythms',
    'Interaction-state matrix',
  ]) {
    assert.ok(design.includes(resolvedContract), `${resolvedContract} must remain documented`)
  }
})

test('leadership reproduces the approved nested panel, portraits, copy, and crop geometry', async () => {
  const [content, page, section, card, styles, design] = await Promise.all([
    source('app/content.ts'),
    source('app/page.tsx'),
    source('design-system/components/LeadershipSection.tsx'),
    source('design-system/components/TeamMemberCard.tsx'),
    source('design-system/styles.module.css'),
    designContract(),
  ])

  for (const exactCopy of [
    'Pedro Seibel, PhD',
    'Geoinformação, gestão territorial e inteligência ambiental',
    'Pedro Seibel é geógrafo, doutor em Geografia pela PUC-Rio',
    'Gabriel Comym',
    'Design de produto, estratégia e experiências digitais',
    'Gabriel Comym é designer de produto e mestre em Artes Computacionais',
  ]) {
    assert.ok(content.includes(exactCopy), `${exactCopy} must match the approved Leadership copy`)
  }

  assert.match(content, /imageSrc: '\/assets\/Photo_Pedro\.png'/)
  assert.match(content, /imageSrc: '\/assets\/Photo_Gabriel\.png'/)
  assert.match(content, /assessoriaLabel: 'Assessoria'/)
  assert.match(content, /assessoriaTitle: 'Design com repertório de território\./)
  assert.match(section, /className=\{styles\.leadershipSection\}[\s\S]*?className=\{styles\.leadershipPanel\}[\s\S]*?<SectionHeader/)
  assert.match(card, /export type TeamMemberImageCrop = 'cover'/)
  const outerBlock = styles.match(/\.leadershipSection\s*\{[^}]*\}/)?.[0] ?? ''
  assert.match(outerBlock, /padding: 0 var\(--gutter-page\);/)
  assert.doesNotMatch(outerBlock, /background:/)
  assert.match(styles, /\.leadershipPanel\s*\{[\s\S]*?gap: var\(--spacing-80\);[\s\S]*?padding: var\(--spacing-48\) var\(--gutter-page\) var\(--spacing-120\);[\s\S]*?background: var\(--color-bg-primary\);/)
  assert.match(styles, /\.leadershipPanel \.sectionHeader\s*\{[\s\S]*?max-width: 1048px;/)
  assert.match(styles, /\.teamMemberCard\s*\{[\s\S]*?gap: var\(--spacing-32\);/)
  assert.match(card, /className=\{styles\.teamMemberContent\}[\s\S]*?className=\{styles\.teamInfo\}[\s\S]*?className=\{styles\.teamBio\}/)
  assert.match(styles, /\.teamMemberContent\s*\{[\s\S]*?gap: var\(--spacing-32\);[\s\S]*?padding-right: var\(--spacing-32\);/)
  assert.match(styles, /@media \(max-width: 767px\)[\s\S]*?\.leadershipSection\s*\{[\s\S]*?padding: 0 var\(--spacing-24\);/)
  assert.match(styles, /\.teamPhoto\s*\{[\s\S]*?aspect-ratio: 1;[\s\S]*?border-radius: var\(--radius-sm\);/)
  assert.match(styles, /\.teamPhotoImage\s*\{[\s\S]*?width: 100%;[\s\S]*?height: 100%;[\s\S]*?object-fit: cover;/)
  assert.match(styles, /\.teamName\s*\{[\s\S]*?line-height: 24px;/)
  assert.match(styles, /\.teamRole,[\s\S]*?\.teamBio\s*\{[\s\S]*?line-height: 19px;/)
  assert.ok(design.includes('Figma master component `32:267`'))
})

test('canonical documentation does not promote stale reference values to global tokens', async () => {
  const [design, tokens] = await Promise.all([
    designContract(),
    source('design-system/tokens.css'),
  ])

  for (const unsupportedToken of ['--radius-xs', '--spacing-12']) {
    assert.doesNotMatch(tokens, new RegExp(`${unsupportedToken}:`))
    assert.ok(!design.includes(`| \`${unsupportedToken}\` |`), `${unsupportedToken} cannot appear in a token table`)
  }

  assert.match(design, /Navigation feedback is required/)
  assert.match(design, /The page is fluid up to `--container-page`/)
  assert.match(design, /The 160px rhythm is a desktop signature, not a mobile requirement/)
})

test('motion language provides subtle one-time element choreography and accessible fallbacks', async () => {
  const [design, tokens, styles, observer, textSection, serviceCard, teamCard, imageBanner, cta, footer] = await Promise.all([
    designContract(),
    source('design-system/tokens.css'),
    source('design-system/styles.module.css'),
    source('design-system/components/MotionObserver.tsx'),
    source('design-system/components/TextSection.tsx'),
    source('design-system/components/ServiceCard.tsx'),
    source('design-system/components/TeamMemberCard.tsx'),
    source('design-system/components/ImageBanner.tsx'),
    source('design-system/components/CtaSection.tsx'),
    source('design-system/components/Footer.tsx'),
  ])

  assert.match(tokens, /--motion-easing-standard: cubic-bezier\(0\.4, 0, 0\.2, 1\);/)
  assert.match(tokens, /--motion-duration-reveal: 600ms;/)
  assert.match(tokens, /--motion-easing-enter: cubic-bezier\(0\.16, 1, 0\.3, 1\);/)
  assert.match(tokens, /--motion-delay-content: 96ms;/)
  assert.match(tokens, /--motion-delay-stagger: 120ms;/)
  assert.match(tokens, /--motion-reveal-mask-size: 160%;/)
  assert.match(styles, /\.navbar\s*\{[\s\S]*?animation: enter-up var\(--motion-duration-reveal\)/)
  assert.match(styles, /\.hero\s*\{[\s\S]*?animation: enter-up var\(--motion-duration-reveal\)/)
  assert.match(observer, /window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)/)
  assert.match(observer, /IntersectionObserver/)
  assert.match(observer, /observer\.unobserve\(entry\.target\)/)
  assert.match(observer, /window\.history\.scrollRestoration = 'manual'/)
  assert.match(observer, /window\.scrollTo\(\{ left: 0, top: 0, behavior: 'instant' \}\)/)
  assert.match(observer, /motionRoot\.dataset\.motionReady = 'true'/)
  assert.match(observer, /rootMargin: '0px 0px -4% 0px'/)
  assert.match(observer, /threshold: 0\.08/)
  assert.match(styles, /:global\(html\[data-motion-ready\]\) \.motionReveal\s*\{[\s\S]*?opacity: 0;[\s\S]*?transform: translateY\(20px\);[\s\S]*?mask-position: 0 100%;/)
  assert.match(styles, /-webkit-mask-image: linear-gradient\(135deg, transparent 0%, black 38%, black 100%\);/)
  assert.match(styles, /@keyframes enter-up[\s\S]*?-webkit-mask-position: 0 100%;[\s\S]*?to \{[\s\S]*?-webkit-mask-position: 100% 0;/)
  assert.match(styles, /:global\(html\[data-motion-ready\]\) \.motionReveal\[data-revealed='true'\]\s*\{[\s\S]*?opacity: 1;[\s\S]*?transform: translateY\(0\);[\s\S]*?mask-image: none;[\s\S]*?mask-position: 100% 0;/)
  assert.match(styles, /\.servicesGrid \.motionReveal\[data-reveal='card'\]:nth-child\(2\)[\s\S]*?transition-delay: calc\(var\(--motion-delay-stagger\) \* 2\);/)
  assert.match(styles, /\.imageBanner\[data-revealed='true'\] img,[\s\S]*?\.teamMemberCard\[data-revealed='true'\] \.teamPhoto/)
  assert.match(styles, /\.button\.motionReveal\[data-revealed='true'\]\s*\{[\s\S]*?transform var\(--motion-duration-fast\)/)
  assert.match(textSection, /data-reveal="label"[\s\S]*?data-reveal="copy"/)
  assert.match(serviceCard, /data-reveal="card"/)
  assert.match(teamCard, /data-reveal="profile"/)
  assert.match(imageBanner, /data-reveal=\{isRevealedOnScroll \? 'media' : undefined\}/)
  assert.match(cta, /data-reveal="heading"[\s\S]*?data-reveal="copy"[\s\S]*?data-reveal="action"/)
  assert.match(footer, /data-reveal="footer-brand"[\s\S]*?data-reveal="footer-nav"/)
  assert.match(styles, /\.navLink:hover\s*\{[\s\S]*?transform: translateY\(-1px\);/)
  assert.match(styles, /\.button:hover\s*\{[\s\S]*?transform: translateY\(-1px\);/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?:global\(html\[data-motion-ready\]\) \.motionReveal[\s\S]*?opacity: 1;[\s\S]*?transform: none;[\s\S]*?transition: none;[\s\S]*?mask-image: none;/)

  for (const contract of [
    '180ms',
    '600ms',
    'Progressive enhancement is mandatory',
    'Reversed scrolling never hides or replays a completed item',
    'alpha-only soft mask',
    'prefers-reduced-motion: reduce',
  ]) {
    assert.ok(design.includes(contract), `${contract} must remain documented in the motion contract`)
  }
})

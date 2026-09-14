'use client'

import { useEffect, useState } from 'react'

import {
  CtaSection,
  Footer,
  HeroSection,
  ImageBanner,
  LeadershipSection,
  MotionObserver,
  Navbar,
  ServicesSection,
  TextSection,
} from '@/design-system'

import { landingContent } from './content'
import type { Language } from '@/design-system'
import styles from './page.module.css'

export default function EarthformLandingPage() {
  const [language, setLanguage] = useState<Language>('pt')
  const content = landingContent[language]

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en-GB' : 'pt-BR'
  }, [language])

  return (
    <div className={styles.page}>
      <Navbar
        closeMenuLabel={content.closeMenuLabel}
        items={content.navigationItems}
        language={language}
        languageLabel={content.languageLabel}
        menuLabel={content.menuLabel}
        mobileNavLabel={content.mobileNavLabel}
        onLanguageChange={setLanguage}
        primaryNavLabel={content.primaryNavLabel}
      />
      <MotionObserver language={language} />
      <main className={styles.main}>
        <HeroSection title={content.heroTitle} />
        <ImageBanner
          alt={content.heroAlt}
          priority
          src="/assets/Image Banner Full.png"
          variant="hero"
        />
        <TextSection
          body={
            <>{content.teseBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</>
          }
          id="tese"
          label={content.teseLabel}
        />
        <ServicesSection id="metodo" label={content.metodoLabel} services={content.services} title={content.metodoTitle} />
        <LeadershipSection
          id="assessoria"
          label={content.assessoriaLabel}
          members={content.teamMembers}
          title={content.assessoriaTitle}
        />
        <TextSection
          body={
            <div className={styles.expertiseList}>
              {content.expertiseAreas.map((area) => (
                <p key={area}>{area}</p>
              ))}
            </div>
          }
          id="atuacao"
          label={content.atuacaoLabel}
        />
        <ImageBanner
          alt={content.moduleAlt}
          src="/assets/Image Module.png"
          variant="grid"
        />
        <CtaSection
          buttonHref="mailto:contato@earthform.io"
          buttonLabel={content.ctaButtonLabel}
          buttonRel="noreferrer"
          buttonTarget="_blank"
          description={content.ctaDescription}
          id="contato"
          title={content.ctaTitle}
        />
      </main>
      <Footer
        footerNavLabel={content.footerNavLabel}
        items={content.navigationItems}
        language={language}
        languageLabel={content.languageLabel}
        onLanguageChange={setLanguage}
      />
    </div>
  )
}

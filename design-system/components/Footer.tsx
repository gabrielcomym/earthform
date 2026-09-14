'use client'

import { Logo } from './Logo'
import { LanguageSwitcher, type Language } from './LanguageSwitcher'
import { NavLink } from './NavLink'
import type { NavigationItem } from './Navbar'
import styles from '../styles.module.css'

export type FooterProps = {
  items: readonly NavigationItem[]
  language: Language
  languageLabel: string
  onLanguageChange: (language: Language) => void
  footerNavLabel: string
}

export function Footer({ items, language, languageLabel, onLanguageChange, footerNavLabel }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.motionReveal} data-reveal="footer-brand">
          <Logo />
        </div>
        <nav
          aria-label={footerNavLabel}
          className={`${styles.footerNav} ${styles.motionReveal}`}
          data-reveal="footer-nav"
        >
          {items.map((item) => (
            <NavLink href={item.href} key={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitcher label={languageLabel} language={language} onLanguageChange={onLanguageChange} />
      </div>
    </footer>
  )
}

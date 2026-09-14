'use client'

import { useState } from 'react'

import { Logo } from './Logo'
import { LanguageSwitcher, type Language } from './LanguageSwitcher'
import { NavLink } from './NavLink'
import styles from '../styles.module.css'

export type NavigationItem = {
  href: string
  label: string
}

export type NavbarProps = {
  items: readonly NavigationItem[]
  language: Language
  languageLabel: string
  onLanguageChange: (language: Language) => void
  primaryNavLabel: string
  mobileNavLabel: string
  menuLabel: string
  closeMenuLabel: string
}

export function Navbar({ items, language, languageLabel, onLanguageChange, primaryNavLabel, mobileNavLabel, menuLabel, closeMenuLabel }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.navbar}>
      <Logo />
      <nav aria-label={primaryNavLabel} className={styles.desktopNav}>
        {items.map((item) => (
          <NavLink href={item.href} key={item.href}>{item.label}</NavLink>
        ))}
      </nav>
      <div className={styles.navbarControls}>
        <LanguageSwitcher label={languageLabel} language={language} onLanguageChange={onLanguageChange} />
        <div className={styles.mobileNav}>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          className={styles.menuButton}
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? closeMenuLabel : menuLabel}
        </button>
        {isOpen ? (
          <nav aria-label={mobileNavLabel} className={styles.mobileNavPanel} id="mobile-navigation">
            {items.map((item) => (
              <NavLink href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
        </div>
      </div>
    </header>
  )
}

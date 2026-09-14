'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <header className={`${styles.navbar} ${isOpen ? styles.navbarOpen : ''}`}>
      <Logo />
      <nav aria-label={primaryNavLabel} className={styles.desktopNav}>
        {items.map((item) => (
          <NavLink href={item.href} key={item.href}>{item.label}</NavLink>
        ))}
      </nav>
      <div className={styles.navbarControls}>
        <div className={styles.desktopLanguageSwitcher}>
          <LanguageSwitcher label={languageLabel} language={language} onLanguageChange={onLanguageChange} />
        </div>
        <div className={styles.mobileNav}>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? closeMenuLabel : menuLabel}
            className={styles.menuButton}
            onClick={() => setIsOpen((value) => !value)}
            ref={isOpen ? closeButtonRef : undefined}
            type="button"
          >
            <Image
              alt=""
              height={24}
              src={isOpen ? '/assets/li_x.svg' : '/assets/li_menu.svg'}
              width={24}
            />
          </button>
          {isOpen ? (
            <div aria-label={mobileNavLabel} aria-modal="true" className={styles.mobileNavPanel} id="mobile-navigation" role="dialog">
              <div className={styles.mobileNavPanelHeader}>
                <Logo />
                <button
                  aria-label={closeMenuLabel}
                  className={styles.menuButton}
                  onClick={() => setIsOpen(false)}
                  ref={closeButtonRef}
                  type="button"
                >
                  <Image alt="" height={24} src="/assets/li_x.svg" width={24} />
                </button>
              </div>
              <nav aria-label={mobileNavLabel} className={styles.mobileMenuNav}>
                {items.map((item) => (
                  <NavLink href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className={styles.mobileMenuLanguages}>
                <LanguageSwitcher label={languageLabel} language={language} onLanguageChange={onLanguageChange} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

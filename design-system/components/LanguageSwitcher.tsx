'use client'

import Image from 'next/image'

import styles from '../styles.module.css'

export type Language = 'pt' | 'en'

export type LanguageSwitcherProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  label: string
}

const options = [
  { code: 'pt' as const, label: 'PT', flag: '/assets/BR - Brazil.png', alt: 'Brasil' },
  { code: 'en' as const, label: 'EN', flag: '/assets/GB-UKM - United Kingdom.png', alt: 'United Kingdom' },
]

export function LanguageSwitcher({ language, onLanguageChange, label }: LanguageSwitcherProps) {
  return (
    <div aria-label={label} className={styles.languageSwitcher} role="group">
      {options.map((option) => {
        const isActive = option.code === language

        return (
          <button
            aria-pressed={isActive}
            className={`${styles.languageOption} ${isActive ? styles.languageOptionActive : ''}`}
            key={option.code}
            onClick={() => onLanguageChange(option.code)}
            type="button"
          >
            <Image alt={option.alt} className={styles.languageFlag} height={12} src={option.flag} width={16} />
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

import type { ReactNode } from 'react'

import styles from '../styles.module.css'

export type SectionHeaderProps = {
  headingId?: string
  label: string
  title: ReactNode
}

export function SectionHeader({ headingId, label, title }: SectionHeaderProps) {
  return (
    <header className={styles.sectionHeader}>
      <p className={`${styles.sectionLabel} ${styles.motionReveal}`} data-reveal="label">
        {label}
      </p>
      <h2 className={`${styles.sectionTitle} ${styles.motionReveal}`} data-reveal="heading" id={headingId}>
        {title}
      </h2>
    </header>
  )
}

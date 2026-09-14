import type { ReactNode } from 'react'

import styles from '../styles.module.css'

export type TextSectionProps = {
  body: ReactNode
  id?: string
  label: string
}

export function TextSection({ body, id, label }: TextSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  return (
    <section aria-labelledby={headingId} className={styles.textSection} id={id}>
      <h2 className={`${styles.sectionLabel} ${styles.motionReveal}`} data-reveal="label" id={headingId}>
        {label}
      </h2>
      <div className={`${styles.editorialBody} ${styles.motionReveal}`} data-reveal="copy">
        {body}
      </div>
    </section>
  )
}

import { Button } from './Button'
import styles from '../styles.module.css'

export type CtaSectionProps = {
  buttonHref: string
  buttonLabel: string
  buttonRel?: string
  buttonTarget?: string
  description: string
  id?: string
  title: string
}

export function CtaSection({
  buttonHref,
  buttonLabel,
  buttonRel,
  buttonTarget,
  description,
  id,
  title,
}: CtaSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  return (
    <section aria-labelledby={headingId} className={styles.ctaSection} id={id}>
      <div className={styles.ctaContent}>
        <div className={styles.ctaTextGroup}>
          <h2 className={`${styles.ctaTitle} ${styles.motionReveal}`} data-reveal="heading" id={headingId}>
            {title}
          </h2>
          <p className={`${styles.ctaDescription} ${styles.motionReveal}`} data-reveal="copy">
            {description}
          </p>
        </div>
        <Button
          className={styles.motionReveal}
          data-reveal="action"
          href={buttonHref}
          rel={buttonRel}
          target={buttonTarget}
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  )
}

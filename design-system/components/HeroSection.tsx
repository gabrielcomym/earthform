import styles from '../styles.module.css'

export type HeroSectionProps = {
  title: string
}

export function HeroSection({ title }: HeroSectionProps) {
  return (
    <section aria-labelledby="earthform-title" className={styles.hero}>
      <h1 className={styles.display} id="earthform-title">
        {title}
      </h1>
    </section>
  )
}

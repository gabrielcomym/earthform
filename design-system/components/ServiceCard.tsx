import styles from '../styles.module.css'

export type ServiceCardProps = {
  category: string
  description: string
}

export function ServiceCard({ category, description }: ServiceCardProps) {
  return (
    <article className={`${styles.serviceCard} ${styles.motionReveal}`} data-reveal="card">
      <div aria-hidden="true" className={styles.serviceCardDivider} />
      <div className={styles.serviceCardCopy}>
        <h3 className={styles.serviceCategory}>{category}</h3>
        <p className={styles.serviceDescription}>{description}</p>
      </div>
    </article>
  )
}

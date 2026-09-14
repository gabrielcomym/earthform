import { SectionHeader } from './SectionHeader'
import { ServiceCard, type ServiceCardProps } from './ServiceCard'
import styles from '../styles.module.css'

export type ServicesSectionProps = {
  id?: string
  label: string
  services: readonly ServiceCardProps[]
  title: string
}

export function ServicesSection({ id, label, services, title }: ServicesSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  return (
    <section aria-labelledby={headingId} className={styles.servicesSection} id={id}>
      <SectionHeader headingId={headingId} label={label} title={title} />
      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <ServiceCard key={service.category} {...service} />
        ))}
      </div>
    </section>
  )
}

import { SectionHeader } from './SectionHeader'
import { TeamMemberCard, type TeamMemberCardProps } from './TeamMemberCard'
import styles from '../styles.module.css'

export type LeadershipSectionProps = {
  id?: string
  label: string
  members: readonly TeamMemberCardProps[]
  title: string
}

export function LeadershipSection({ id, label, members, title }: LeadershipSectionProps) {
  const headingId = id ? `${id}-title` : undefined

  return (
    <section aria-labelledby={headingId} className={styles.leadershipSection} id={id}>
      <div className={styles.leadershipPanel}>
        <SectionHeader headingId={headingId} label={label} title={title} />
        <div className={styles.teamGrid}>
          {members.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  )
}

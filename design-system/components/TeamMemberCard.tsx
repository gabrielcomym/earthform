import Image from 'next/image'

import styles from '../styles.module.css'

export type TeamMemberImageCrop = 'cover'

export type TeamMemberCardProps = {
  bio: string
  imageAlt?: string
  imageCrop?: TeamMemberImageCrop
  imageSrc: string
  name: string
  role: string
}

export function TeamMemberCard({
  bio,
  imageAlt = '',
  imageSrc,
  name,
  role,
}: TeamMemberCardProps) {
  return (
    <article className={`${styles.teamMemberCard} ${styles.motionReveal}`} data-reveal="profile">
      <div className={styles.teamPhoto}>
        <Image
          alt={imageAlt}
          className={styles.teamPhotoImage}
          height={2048}
          sizes="(max-width: 767px) calc(100vw - 48px), 500px"
          src={imageSrc}
          width={2048}
        />
      </div>
      <div className={styles.teamMemberContent}>
        <div className={styles.teamInfo}>
          <h3 className={styles.teamName}>{name}</h3>
          <p className={styles.teamRole}>{role}</p>
        </div>
        <p className={styles.teamBio}>{bio}</p>
      </div>
    </article>
  )
}

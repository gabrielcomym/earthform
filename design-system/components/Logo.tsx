import Image from 'next/image'

import styles from '../styles.module.css'

export type LogoProps = {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Image
      alt="Earthform"
      className={`${styles.logo} ${className}`.trim()}
      height={13}
      priority
      src="/assets/earthform-logo.svg"
      width={128}
    />
  )
}

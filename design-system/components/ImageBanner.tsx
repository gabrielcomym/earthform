import Image from 'next/image'

import styles from '../styles.module.css'

export type ImageBannerProps = {
  alt?: string
  priority?: boolean
  src: string
  variant?: 'full' | 'grid' | 'hero'
}

export function ImageBanner({ alt = '', priority = false, src, variant = 'full' }: ImageBannerProps) {
  const isHero = variant === 'hero'
  const isRevealedOnScroll = !priority && !isHero

  return (
    <figure
      className={`${styles.imageBanner} ${styles[`imageBanner-${variant}`]} ${
        isRevealedOnScroll ? styles.motionReveal : ''
      }`}
      data-reveal={isRevealedOnScroll ? 'media' : undefined}
    >
      <Image
        alt={alt}
        fetchPriority={priority ? 'high' : undefined}
        fill
        preload={priority}
        sizes={isHero || variant === 'full' ? '100vw' : '(max-width: 1400px) calc(100vw - 96px), 1304px'}
        src={src}
      />
    </figure>
  )
}

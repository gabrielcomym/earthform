'use client'

import { useEffect } from 'react'

export function MotionObserver({ language }: { language?: string }) {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    if (!window.location.hash) {
      window.scrollTo({ left: 0, top: 0, behavior: 'instant' })
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      return
    }

    const motionRoot = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (elements.length === 0) {
      return
    }

    motionRoot.dataset.motionReady = 'true'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          entry.target.setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        }
      },
      {
        rootMargin: '0px 0px -4% 0px',
        threshold: 0.08,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
    }
  }, [language])

  return null
}

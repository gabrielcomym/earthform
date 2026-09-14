'use client'

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'

import styles from '../styles.module.css'

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  href: string
}

const scrollDurationMs = 720

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function isSamePageHash(href: string) {
  return href.startsWith('#') && href.length > 1
}

function focusTarget(target: HTMLElement) {
  const hadTabIndex = target.hasAttribute('tabindex')

  if (!hadTabIndex) {
    target.setAttribute('tabindex', '-1')
  }

  target.focus({ preventScroll: true })

  if (!hadTabIndex) {
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
}

function scrollToHash(href: string) {
  const target = document.getElementById(decodeURIComponent(href.slice(1)))

  if (!target) {
    return false
  }

  const targetElement = target

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targetElement.scrollIntoView()
    window.history.pushState(null, '', href)
    focusTarget(targetElement)
    return true
  }

  const scrollPadding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const startY = window.scrollY
  const targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - scrollPadding)
  const distance = targetY - startY
  const startTime = performance.now()

  function tick(now: number) {
    const progress = Math.min(1, (now - startTime) / scrollDurationMs)

    window.scrollTo(0, startY + distance * easeInOut(progress))

    if (progress < 1) {
      window.requestAnimationFrame(tick)
      return
    }

    window.history.pushState(null, '', href)
    focusTarget(targetElement)
  }

  window.requestAnimationFrame(tick)
  return true
}

export function NavLink({ children, className = '', onClick, ...props }: NavLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    if (!isSamePageHash(props.href)) {
      return
    }

    event.preventDefault()
    scrollToHash(props.href)
  }

  return (
    <a className={`${styles.navLink} ${className}`.trim()} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

'use client'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import styles from '../styles.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type SharedProps = {
  children: ReactNode
  className?: string
  variant?: ButtonVariant
}

type ButtonAsLinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonAsButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const classes = `${styles.button} ${styles[`button-${variant}`]} ${className}`.trim()

  if ('href' in props && typeof props.href === 'string') {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

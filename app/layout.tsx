import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Earthform | Produtos para decisões sobre território',
  description:
    'Estratégia e design de produto para empresas de geoinformação, ambiente e inteligência territorial.',
  icons: {
    icon: [
      { url: '/assets/favicon_earthform.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon_earthform.png', type: 'image/png', sizes: '32x32' },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

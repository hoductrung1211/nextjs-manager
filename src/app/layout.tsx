import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Provider from '@/layouts/Provider'
import Template from './templates'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'TeS Insight',
  description: 'Technology Solution Careers Management',
  icons: 'screen.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={roboto.className}>
        <Provider>
          <Template>
            {children}
          </Template>
        </Provider>
      </body>
    </html>
  )
}

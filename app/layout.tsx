import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Roboto } from 'next/font/google'

import './globals.css'

import { AppFooter, AppHeader } from './components'
import Link from 'next/link'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Stock App',
  description: 'Stock web application using Next.js and Polygon.io API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <div className='flex justify-start items-stretch min-h-screen'>
          <aside className='hidden lg:flex lg:flex-none lg:justify-center lg:items-start lg:w-[72px] lg:h-auto lg:bg-[#B6B7C3] lg:pt-4'>
            <Link href='/'>
              <span className='block w-[35px] h-[35px] rounded-full bg-[#001458]' />
            </Link>
          </aside>
          <div className='flex-grow flex flex-col'>
            <AppHeader />
            <div className='container mx-auto flex-grow'>{children}</div>
            <AppFooter />
          </div>
        </div>
        <div id='drawer-root'></div>
        <Analytics />
      </body>
    </html>
  )
}

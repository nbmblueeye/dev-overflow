import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/shares/navbars/NavBar'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import '../styles/prismjs.css'
import ThemeContext from '@/context/ThemeContext'
import React from 'react'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--inter-font' })

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--space_grotesk-font' })

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      elements: {
        formButtonPrimary: 'primary-gradient',
        footerActionLink: 'primary-text-gradient hover:text-primary-500'
      }
    }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable} background-light900_dark100 size-full`}>
          <ThemeContext>
            <NavBar/>
            {children}
          </ThemeContext>
        </body>
      </html>
    </ClerkProvider>
  )
}

'use client'
import React from 'react'

import {
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import { useThemeContext } from '@/context/ThemeContext'
import { dark } from '@clerk/themes'

const Auth = () => {
  const { activeTheme } = useThemeContext()
  return (
        <>
            <SignedIn>
                <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'h-10 w-10'
                  },
                  variables: {
                    colorPrimary: '#ff7000'
                  },
                  baseTheme: activeTheme.value === 'dark' ? dark : undefined
                }}
                />
            </SignedIn>
        </>
  )
}

export default Auth

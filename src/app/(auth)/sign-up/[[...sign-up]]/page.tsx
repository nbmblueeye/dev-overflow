'use client'
import { useThemeContext } from '@/context/ThemeContext'
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page () {
  const { activeTheme } = useThemeContext()

  return <SignUp
  path="/sign-up"
  appearance={
    activeTheme.value === 'dark' ? { baseTheme: dark } : undefined
  }
  />
}

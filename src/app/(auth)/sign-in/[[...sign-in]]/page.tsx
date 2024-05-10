'use client'
import { useThemeContext } from '@/context/ThemeContext'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const Page = () => {
  const { activeTheme } = useThemeContext()

  return (
    <SignIn
        path="/sign-in"
        appearance={
            activeTheme.value === 'dark' ? { baseTheme: dark } : undefined
        }
    />
  )
}

export default Page

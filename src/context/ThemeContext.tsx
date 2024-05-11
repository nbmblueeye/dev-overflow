'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

 type Theme = {
    value: string,
    label: string,
    icon: string,
 }

 interface ThemeValue{
    activeTheme:Theme,
    setActiveTheme: (value:Theme) => void,
    mode: string
}

const CreateThemeContext = createContext<ThemeValue|undefined>({} as ThemeValue)

const ThemeContext = ({ children }:{children:React.ReactNode}) => {
  const [activeTheme, setActiveTheme] = useState<Theme>({
    value: 'light', label: 'Light', icon: '/assets/icons/sun.svg'
  })
  const [mode, setMode] = useState('light')

  const handleThemeChange = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setMode('dark')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      setMode('light')
    }
  }

  useEffect(() => {
    handleThemeChange()
  }, [activeTheme])

  return (
        <CreateThemeContext.Provider value={{
          activeTheme,
          setActiveTheme,
          mode
        }}>
            {children}
        </CreateThemeContext.Provider>
  )
}

export default ThemeContext

export function useThemeContext () {
  const context = useContext(CreateThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be defined')
  }
  return context
}

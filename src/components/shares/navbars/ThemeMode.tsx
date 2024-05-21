'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { themes } from '@/constants'
import { useThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'

const ThemeMode = () => {
  const { activeTheme, setActiveTheme } = useThemeContext()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[40px]">
            <Image
              src={activeTheme?.icon}
              width={20}
              height={20}
              alt={activeTheme?.value}
              className="active-theme"
            />

          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col">
            <NavigationMenuLink>
              {
                themes.map((theme:any, index:any) => (
                  <Button key={index} className="flex min-w-[100px] flex-row justify-between hover:bg-light-700 dark:hover:bg-dark-400"
                  onClick={() => {
                    setActiveTheme(theme)
                    if (theme.value !== 'system') {
                      localStorage.theme = theme.value
                    } else {
                      localStorage.removeItem('theme')
                    }
                  }}
                  >
                    <Image
                      src={theme.icon}
                      width={14}
                      height={14}
                      alt={theme.value}
                      className={`${theme.value === activeTheme?.value && 'active-theme'}`}
                    />
                    <span className="text-light800_dark200 font-spaceGrotesk text-sm font-normal">{theme.label}</span>
                  </Button>
                ))
              }
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default ThemeMode

import React from 'react'
import ThemeMode from './ThemeMode'
import Image from 'next/image'
import Link from 'next/link'
import Auth from './Auth'
import GlobalSearch from '../searchs/GlobalSearch'
import MobileNavBar from './MobileNavBar'

const NavBar = () => {
  return (
    <header className='border-light800_dark200 background-light800_dark200 z-50 w-full border-b shadow-light-100 dark:shadow-dark-100'>
      <nav className='hidden h-[80px] flex-row items-center justify-between gap-4 px-6 sm:flex'>
        <Link href='/'>
          <div className="flex flex-row items-center justify-center">
            <Image
              src="/assets/images/site-logo.svg"
              width={24}
              height={24}
              alt="DevFlow"
            />
            &nbsp;
            <p className="font-spaceGrotesk text-2xl font-medium text-primary-500"><span className="text-3xl font-bold text-dark-100 dark:text-light-900">Dev</span>&nbsp;OverFlow</p>
          </div>
        </Link>
        <GlobalSearch/>
        <div className='flex flex-row gap-8'>
          <ThemeMode/>
          <Auth/>
        </div>
      </nav>
      <MobileNavBar/>
    </header>
  )
}

export default NavBar

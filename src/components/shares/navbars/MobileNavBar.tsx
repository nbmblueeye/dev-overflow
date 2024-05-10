'use client'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'

import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import ThemeMode from './ThemeMode'

const MobileNavBar = () => {
  const pathName = usePathname()

  return (
    <Sheet>
        <nav className='flex flex-row items-center justify-between gap-4 px-6 py-4 sm:hidden'>
            <Link href='/'>
                <Image
                    src="/assets/images/site-logo.svg"
                    width={24}
                    height={24}
                    alt="DevFlow"
                />
            </Link>
            <div className='flex flex-row gap-8'>
                <ThemeMode/>
                <SheetTrigger className='mb-0'>
                    <Image
                        src="/assets/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger"
                        className='inverted-colors'
                    />
                </SheetTrigger>
            </div>
        </nav>
        <SheetContent side="left" className="background-light800_dark200 z-50 max-w-[300px] p-4 shadow-light-100 dark:shadow-dark-100">
            <SheetHeader className="mb-[16px] flex h-[60px] flex-row items-center justify-start space-y-0">
                <Image
                    src="/assets/images/site-logo.svg"
                    width={24}
                    height={24}
                    alt="logo"
                />
                &nbsp;
                <p className="font-spaceGrotesk text-[20px] font-medium text-primary-500">
                    <span className="text-[20px] font-bold text-dark-100 dark:text-light-900">Dev</span>
                    &nbsp;OverFlow
                </p>
            </SheetHeader>
            <section className='custom-scroll sticky left-0 top-0 flex h-[calc(100vh-90px)] w-full flex-col justify-between gap-8 overflow-y-auto py-2'>
                <div className="flex w-full flex-col gap-8">
                    {
                        sidebarLinks.map((item, index) => {
                          return (
                            <Link key={index} href={item.route} className={`flex flex-row justify-start gap-10 p-2 ${pathName === item.route ? 'hover-text-light-400 bg-primary-500 !text-primary-100' : 'hover-light700_dark400'}`}>
                                <Image
                                src={item.imgURL}
                                width={20}
                                height={20}
                                alt={item.label}
                                className={`${pathName === item.route ? '!primary-100' : 'inverted-colors'}`}
                                />
                                <p className={`font-inter text-lg font-medium ${pathName === item.route ? 'hover-text-light-400 !text-primary-100' : 'text-light900_dark300 hover-light700_dark400'}`}>{item.label}</p>
                            </Link>
                          )
                        }
                        )
                    }
                </div>
                <SignedOut>
                    <Link href="/sign-up">
                        <div className="hover-light700_dark400 mb-4 flex flex-row justify-start gap-8 p-2">
                            <Image
                            src="/assets/icons/sign-up.svg"
                            width={20}
                            height={20}
                            alt="sign-up"
                            className='inverted-colors'
                            />
                            <p className="text-light900_dark300 font-inter text-lg font-medium">Sign Up</p>
                        </div>
                    </Link>
                    <Link href="/sign-in">
                        <div className="border-light700_dark400 hover-light700_dark400 flex flex-row justify-start gap-8 rounded border p-2">
                            <Image
                            src="/assets/icons/account.svg"
                            width={20}
                            height={20}
                            alt="account"
                            className='inverted-colors'
                            />
                            <p className="text-light900_dark300 font-inter text-lg font-medium">Sign In</p>
                        </div>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <SignOutButton>
                        <div className="border-light700_dark400 hover-light700_dark400 flex flex-row justify-start gap-8 rounded border p-2">
                            <Image
                            src="/assets/icons/sign-out.svg"
                            width={20}
                            height={20}
                            alt="sign-out"
                            className='inverted-colors'
                            />
                            <p className="text-light900_dark300 font-inter text-lg font-medium">Sign Out</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
             </section>

        </SheetContent>
    </Sheet>
  )
}

export default MobileNavBar

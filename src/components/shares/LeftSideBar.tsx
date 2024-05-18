'use client'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSideBar = () => {
  const pathName = usePathname()
  const { userId } = useAuth()

  return (
    <section className='custom-scroll border-light800_dark200 sticky left-0 top-0 z-0 hidden h-[calc(100vh-80px)] w-fit flex-col justify-between gap-8 overflow-y-auto border-r px-6 pb-8 pt-10 shadow-light-100 dark:shadow-dark-100 sm:flex lg:w-[280px]'>
      <div className="flex w-full flex-col gap-8">
        {
          sidebarLinks.map((item, index) => {
            if (item.route === '/profile') {
              if (!userId) {
                item.route = '/sign-in'
              } else {
                item.route = `/profile/${userId}`
              }
            }
            return (
              <Link key={index} href={item.route} className={`flex flex-row justify-center gap-8 p-2 md:justify-start ${pathName === item.route ? 'hover-text-light-400 bg-primary-500 !text-primary-100' : 'hover-light700_dark400'}`}>
                <Image
                  src={item.imgURL}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={`${pathName === item.route ? '!primary-100' : 'inverted-colors'}`}
                />
                <p className={`font-inter text-lg font-medium ${pathName === item.route ? 'hover-text-light-400 !text-primary-100' : 'text-light900_dark300 hover-light700_dark400'}  max-lg:hidden`}>{item.label}</p>
              </Link>
            )
          }
          )
        }
      </div>
      <SignedOut>
        <Link href="/sign-up">
          <div className="hover-light700_dark400 flex flex-row justify-center gap-8 p-2 md:justify-start">
            <Image
              src="/assets/icons/sign-up.svg"
              width={20}
              height={20}
              alt="sign-up"
              className='inverted-colors'
            />
            <p className="text-light900_dark300 font-inter text-lg font-medium max-lg:hidden">Sign Up</p>
          </div>
        </Link>
        <Link href="/sign-in">
          <div className="border-light700_dark400 hover-light700_dark400 flex flex-row justify-center gap-8 rounded border p-2 md:justify-start">
            <Image
              src="/assets/icons/account.svg"
              width={20}
              height={20}
              alt="account"
              className='inverted-colors'
            />
            <p className="text-light900_dark300 font-inter text-lg font-medium max-lg:hidden">Sign In</p>
          </div>
        </Link>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <div className="border-light700_dark400 hover-light700_dark400 flex flex-row justify-center gap-8 rounded border p-2 md:justify-start">
            <Image
              src="/assets/icons/sign-out.svg"
              width={20}
              height={20}
              alt="sign-out"
              className='inverted-colors'
            />
            <p className="text-light900_dark300 font-inter text-lg font-medium max-lg:hidden">Sign Out</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </section>
  )
}

export default LeftSideBar

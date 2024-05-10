'use client'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <section className='sticky left-0 top-0 overflow-y-auto h-[calc(100vh-80px)] custom-scroll hidden sm:flex flex-col justify-between gap-8 w-fit lg:w-[280px] pt-10 pb-8 px-6 border-r border-light800_dark200 z-0 shadow-light-100 dark:shadow-dark-100'>
      <div className="w-full flex flex-col gap-8">
        {
          sidebarLinks.map((item, index) => {
            return(
              <Link key={index} href={item.route} className={`flex flex-row justify-center md:justify-start gap-8 p-2 ${pathName == item.route ? "bg-primary-500 !text-primary-100 hover-text-light-400":"hover-light700_dark400"}`}>
                <Image 
                  src={item.imgURL}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={`${pathName == item.route ? "!primary-100":"inverted-colors"}`}
                />
                <p className={`font-inter font-medium text-lg ${pathName == item.route ? "!text-primary-100 hover-text-light-400":"text-light900_dark300 hover-light700_dark400"}  max-lg:hidden`}>{item.label}</p>
              </Link>
            )
          }
          )
        }
      </div>
      <SignedOut>
        <Link href="/sign-up">
          <div className="flex flex-row justify-center md:justify-start gap-8 p-2 hover-light700_dark400">
            <Image
              src="/assets/icons/sign-up.svg"
              width={20}
              height={20}
              alt="sign-up"
              className='inverted-colors'
            /> 
            <p className="font-inter font-medium text-lg text-light900_dark300 max-lg:hidden">Sign Up</p>
          </div>
        </Link>
        <Link href="/sign-in">
          <div className="flex flex-row justify-center md:justify-start border rounded border-light700_dark400 gap-8 p-2 hover-light700_dark400">
            <Image
              src="/assets/icons/account.svg"
              width={20}
              height={20}
              alt="account"
              className='inverted-colors'
            /> 
            <p className="font-inter font-medium text-lg text-light900_dark300 max-lg:hidden">Sign In</p>
          </div>
        </Link>
      </SignedOut>
      <SignedIn>
      <SignOutButton>
      <div className="flex flex-row justify-center md:justify-start gap-8 p-2 border rounded border-light700_dark400 hover-light700_dark400">
        <Image
          src="/assets/icons/sign-out.svg"
          width={20}
          height={20}
          alt="sign-out"
          className='inverted-colors'
        /> 
        <p className="font-inter font-medium text-lg text-light900_dark300 max-lg:hidden">Sign Out</p>
      </div>
      </SignOutButton>
      </SignedIn>
    </section>
  )
}

export default LeftSideBar

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
    title: string,
    description: string,
    buttonText: string,
    link: string
}

const EmptyResult = ({ title, description, buttonText, link }:Props) => {
  return (
    <div className='mx-auto flex max-w-[500px] flex-col items-center justify-center'>
          <Image
            src='/assets/images/light-illustration.png'
            width={500}
            height={0}
            alt="light illumination"
            className='mb-16 block object-contain dark:hidden'
          />
          <Image
            src='/assets/images/dark-illustration.png'
            width={500}
            height={0}
            alt="dark illumination"
            className='mb-16 hidden object-contain dark:flex'
          />
        <h3 className="text-light900_dark300 mb-4 w-fit font-inter text-xl font-bold">{title}</h3>
        <p className="text-light500_dark400 mb-6 font-inter text-base font-medium">{description}</p>
        <Link href={link} >
            <Button className="bg-primary-500 px-4 py-3 font-inter text-base font-medium text-primary-100 hover:text-light-700">
                {buttonText}
            </Button>
        </Link>
    </div>
  )
}

export default EmptyResult

'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  name: string,
  link: string,
}

const ButtonC = ({ name, link }:Props) => {
  return (
   <Link href={link}>
      <Button
        className="bg-primary-500 px-4 py-3 font-inter text-base font-medium text-primary-100 hover:text-light-700"
      >
        { name }
      </Button>
   </Link>
  )
}

export default ButtonC

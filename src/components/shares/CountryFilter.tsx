'use client'
import React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { addQueryUrl, removeQueryUrl } from '@/lib/utils'
import Image from 'next/image'

type Props = {
  filters: any,
  addClass: string,
  route?: string
}

const CountryFilter = ({ filters, addClass, route }:Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const handleFilterTag = (value:string) => {
    if (value !== '') {
      const newUrl = addQueryUrl({
        params: searchParams.toString(),
        key: 'location',
        value
      })
      router.push(newUrl, { scroll: false })
    } else {
      if (route === pathName) {
        const newUrl = removeQueryUrl({
          params: searchParams.toString(),
          keyToRemove: ['location']
        })
        router.push(newUrl, { scroll: false })
      }
    }
  }

  return (
        <Select onValueChange={handleFilterTag} defaultValue={searchParams.get('filter') || undefined}>
            <SelectTrigger className={ `max-w-[250px] ${addClass}` }>
                <Image
                    src='/assets/icons/location.svg'
                    width={20}
                    height={20}
                    alt='location'
                />
                <SelectValue placeholder="Select a Country" />
            </SelectTrigger>
            <SelectContent>
                {
                    filters.map((filter:any, index:any) => {
                      return (
                         <SelectItem key={index} value={filter.name.common} className='hover-light700_dark400'>{filter.name.common}</SelectItem>
                      )
                    })
                }
            </SelectContent>
        </Select>
  )
}

export default CountryFilter

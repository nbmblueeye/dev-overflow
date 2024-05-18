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

type Props = {
  addClass: string,
  filters: any[],
  route?: string
}

const FilterSelect = ({ addClass, filters, route }:Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const handleFilterTag = (value:string) => {
    if (value !== '') {
      const newUrl = addQueryUrl({
        params: searchParams.toString(),
        key: 'filter',
        value
      })
      router.push(newUrl, { scroll: false })
    } else {
      console.log(route, pathName)
      if (route === pathName) {
        const newUrl = removeQueryUrl({
          params: searchParams.toString(),
          keyToRemove: ['filter']
        })
        router.push(newUrl, { scroll: false })
      }
    }
  }

  return (
    <Select onValueChange={handleFilterTag} defaultValue={searchParams.get('filter') || undefined}>
        <SelectTrigger className={ `max-w-[200px] ${addClass}` }>
            <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
            {
                filters.map((filter:any, index:any) => {
                  return (
                        <SelectItem key={index} value={filter._id} className='hover-light700_dark400'>{filter.name}</SelectItem>
                  )
                })
            }
        </SelectContent>
    </Select>
  )
}

export default FilterSelect

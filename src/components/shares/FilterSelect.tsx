import React from 'react'
import { filters } from '@/constants'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const FilterSelect = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleFilterTag = (value:string) => {
    const params = qs.parse(searchParams.toString())
    params.filter = value
    const searchUrl = qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: params
      }
    )
    router.push(searchUrl, { scroll: false })
  }

  return (
    <Select onValueChange={handleFilterTag} defaultValue={searchParams.get('filter') || undefined}>
        <SelectTrigger className="max-w-[200px] capitalize md:hidden ">
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

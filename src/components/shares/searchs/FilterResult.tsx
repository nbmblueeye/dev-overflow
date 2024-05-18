import { Button } from '@/components/ui/button'
import { GlobalSearchFilters } from '@/constants/filter'
import { addQueryUrl, removeQueryUrl } from '@/lib/utils'

import React, { useState } from 'react'

type Props = {
  searchParams:any,
  router:any
}
const FilterResult = ({ searchParams, router }:Props) => {
  const [active, setActive] = useState('')
  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, filter: string) => {
    if (filter === active) {
      setActive('')
      const filterUrl = removeQueryUrl({
        params: searchParams.toString(),
        keyToRemove: ['tyle']
      })
      router.push(filterUrl)
    } else {
      setActive(filter)
      const filterUrl = addQueryUrl({
        params: searchParams.toString(),
        key: 'type',
        value: filter
      })
      router.push(filterUrl)
    }
  }
  return (
    <div className="flex flex-row flex-wrap items-center gap-8">
      <p className='text-light500_dark400 font-inter text-sm font-medium'>Type: </p>
      <div className="flex flex-1 flex-row flex-wrap gap-4 md:gap-8">
        {
          GlobalSearchFilters.map((filter:any, index:number) => (
            <Button key={index} className={`z-50 rounded-md font-inter text-sm font-normal capitalize shadow ${active === filter._id ? 'bg-primary-500 text-primary-100 hover:text-light-700' : 'background-light800_dark300 text-light500_dark400 hover-light700_dark400'}`}
                onClickCapture={(e) => handleFilter(e, filter._id)}
            >
            {filter.name}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default FilterResult

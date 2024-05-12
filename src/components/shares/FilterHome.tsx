'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { filters } from '@/constants'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'query-string'

const FilterHome = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [active, setActive] = useState('')
  const handleFilterTag = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, value:string) => {
    e.preventDefault()
    if (active === value) {
      setActive('')
      const params = qs.parse(searchParams.toString())
      delete params.filter
      const searchUrl = qs.stringifyUrl(
        {
          url: window.location.pathname,
          query: params
        }
      )

      router.push(searchUrl, { scroll: false })
    } else {
      setActive(value)
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
  }

  return (
    <div className="hidden flex-row flex-wrap gap-8 md:flex">
      {
        filters.map((filter:any, index:any) => {
          return (
            <Button key={index} className={`z-50 rounded-md px-4 py-2 font-inter text-xs font-medium capitalize shadow ${active === filter._id ? 'bg-primary-500 text-primary-100 hover:text-light-700' : 'background-light800_dark300 text-light500_dark400 hover-light700_dark400'}`}
              onClickCapture={(e) => handleFilterTag(e, filter._id)}
            >
                {filter.name}
            </Button>
          )
        })
      }
    </div>
  )
}

export default FilterHome

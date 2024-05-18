'use client'
import { addQueryUrl, removeQueryUrl } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  route: string
}

const LocalSearch = ({ route }: Props) => {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathName = usePathname()
  const handleLocalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
  }

  useEffect(() => {
    const setSearchQueryTimeout = setTimeout(() => {
      if (search !== '') {
        const newUrl = addQueryUrl({
          params: searchParams.toString(),
          key: 'q',
          value: search
        })
        router.push(newUrl, { scroll: false })
      } else {
        console.log(route, pathName)
        const newUrl = removeQueryUrl({
          params: searchParams.toString(),
          keyToRemove: ['q']
        })
        router.push(newUrl, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(setSearchQueryTimeout)
  }, [search, searchParams, router, route, pathName])

  return (
      <div className="background-light800_dark200 border-light700_dark400 flex flex-1 flex-row gap-4 rounded-lg border p-4">
          <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <input type="text"
          className="no-focus text-light800_dark200 flex-1 border-none bg-transparent text-base font-normal outline-none placeholder:text-light-500"
          placeholder="Search for questions..." name='s' value={search}
          onChange={(e) => handleLocalSearch(e)}
          />
    </div>
  )
}

export default LocalSearch

'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import GlobalResult from './GlobalResult'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addQueryUrl, removeQueryUrl } from '@/lib/utils'

const GlobalSearch = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const query = searchParams.get('q')
  const [globalSearch, setGlobalSearch] = useState(query || '')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const resetSearchQuery = setTimeout(() => {
      if (globalSearch) {
        const filterUrl = addQueryUrl({
          params: searchParams.toString(),
          key: 'global',
          value: globalSearch
        })
        router.push(filterUrl, { scroll: false })
      } else {
        const filterUrl = removeQueryUrl({
          params: searchParams.toString(),
          keyToRemove: ['type', 'global']
        })
        router.push(filterUrl)
      }
    }, 300)

    return () => clearTimeout(resetSearchQuery)
  }, [globalSearch, router, searchParams])

  useEffect(() => {
    const handleEventClick = (e:any) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setGlobalSearch('')
      }
    }
    setOpen(false)
    document.addEventListener('click', handleEventClick)
    return () => {
      document.removeEventListener('click', handleEventClick)
    }
  }, [pathName])

  return (
    <div className="background-light800_dark200 border-light700_dark400 relative z-50 flex w-[600px] flex-row gap-4 rounded-lg border p-4 max-lg:hidden" ref={containerRef}>
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />
      <input type="text" autoComplete='off' className="no-focus text-light800_dark200 flex-1 border-none bg-transparent text-base font-normal outline-none placeholder:text-light-500" placeholder="Search anything globally..." name='s' value={globalSearch}
        onChange={(e) => {
          setGlobalSearch(e.target.value)
          if (!open) setOpen(true)
          if (open && e.target.value === '') setOpen(false)
        }}
      />
      {open && <GlobalResult
        search={globalSearch}
        searchParams={searchParams}
        router={router}
      />}
    </div>
  )
}

export default GlobalSearch

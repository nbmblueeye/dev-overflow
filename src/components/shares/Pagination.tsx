'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { addQueryUrl } from '@/lib/utils'

type Props = {
  pageNumber: number,
  hasNextPage: boolean
}

const Pagination = ({ pageNumber, hasNextPage }: Props) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const handlePagination = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action:string) => {
    e.preventDefault()
    const nextPageNumber = action === 'next' ? pageNumber + 1 : pageNumber - 1
    const newUrl = addQueryUrl({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString()
    })
    router.push(newUrl)
  }
  if (pageNumber === 1 && !hasNextPage) return null
  return (
    <div className='flex flex-row gap-1'>
      <Button disabled={pageNumber === 1} className="background-light800_dark300 text-light500_dark400 hover-light700_dark400 border-light700_dark400 border px-4 py-2 font-inter text-sm font-medium shadow-light-100 dark:shadow-dark-100" onClick={(e) => handlePagination(e, 'prev')}>
          Prev
      </Button>
      <Button className="border-light700_dark400 border bg-primary-500 px-4 py-2 font-inter text-sm font-medium text-primary-100 shadow-light-100 dark:shadow-dark-100 ">
      {pageNumber}
      </Button>
      <Button disabled={!hasNextPage} className="background-light800_dark300 text-light500_dark400 hover-light700_dark400 border-light700_dark400 border px-4 py-2 font-inter text-sm font-medium shadow-light-100 dark:shadow-dark-100" onClick={(e) => handlePagination(e, 'next')}>
          Next
      </Button>
    </div>
  )
}

export default Pagination

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FilterResult from './FilterResult'
import { handleGlobalSerach } from '@/backend/controllers/global.controller'
import Spinner from '../Spinner'

type Props = {
    search: string
    searchParams:any,
    router:any
}
const GlobalResult = ({ search, searchParams, router }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([
    { id: '1', type: 'question', title: 'NextJS question' },
    { id: '1', type: 'answer', title: 'NextJS answer' },
    { id: '1', type: 'user', title: 'NextJS user' }
  ])

  const global = searchParams.get('global')
  const type = searchParams.get('type')

  useEffect(() => {
    setIsLoading(true)
    setResults([])
    const submitGlobalSearch = async () => {
      try {
        const results = await handleGlobalSerach({ global, type })
        if (results) {
          console.log(JSON.parse(results))
          setResults(JSON.parse(results))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 200)
      }
    }

    if (global) {
      submitGlobalSearch()
    }
  }, [global, type])

  const formatLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`
      case 'answer':
        return `/question/${id}`
      case 'user':
        return `/profile/${id}`
      case 'tag':
        return `/tag/${id}`
      default:
        return '/'
    }
  }

  return (
    <div className='background-light800_dark200 border-light700_dark400 absolute inset-x-0 top-full z-50 mt-4 flex flex-col flex-wrap rounded-lg border p-4'>
      <FilterResult
      searchParams={searchParams}
      router={router}
      />

      <div className="mt-8 w-full">
        {
          isLoading
            ? <Spinner addClass='mx-auto stroke-primary-500 w-[40px] h-[40px]'/>
            : <div className="flex flex-col gap-6">
          {
            results.length > 0
              ? results.map((result:any, index:number) =>
                (
                <Link href={formatLink(result.type, result.id)}
                  key={`${result.type} ${result.id} ${index}`}
                  className="hover-light700_dark400 flex w-full flex-row items-start gap-4 px-4 py-2"
                >
                    <Image
                      src='/assets/icons/tag.svg'
                      width={16}
                      height={16}
                      alt="global search result"
                      className='inverted-colors mt-1.5 object-contain'
                    />
                    <div className="flex flex-col">
                      <p className='text-light500_dark400 text-wrap font-inter text-sm font-normal'>{result.title}</p>
                      <p className='text-light500_dark400 mt-2 text-wrap font-inter text-sm font-medium'>{result.type}</p>
                    </div>
                </Link>
                )
              )
              : (
                  <p className='text-light500_dark400 mx-auto mt-2 text-wrap font-inter text-sm font-medium'>No result found</p>
                )
          }
          </div>
        }
      </div>
    </div>
  )
}

export default GlobalResult

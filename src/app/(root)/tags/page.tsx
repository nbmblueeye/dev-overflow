import { getAllTags } from '@/backend/controllers/tag.controller'
import FilterSelect from '@/components/shares/FilterSelect'
import Pagination from '@/components/shares/Pagination'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { Badge } from '@/components/ui/badge'
import { TagFilters } from '@/constants/filter'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'DevFlow | Tag'
}

export default async function Page ({ searchParams }:{searchParams:{[key:string]:string} }) {
  const results = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All Tags</h2>
        <div className="flex flex-row flex-wrap gap-10">
            <LocalSearch
            route="/tags"
            />
            <FilterSelect
              filters={TagFilters}
              addClass='Capitalize'
              route="/tags"
            />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {
          results.tags.length > 0
            ? results.tags.map((tag, index) => {
              return (
              <Link href={ `tags/${tag._id}` } key={index}>
                <article className="border-light700_dark400 hover-light700_dark400 flex flex-col items-start rounded-md border p-3 shadow-light-100 dark:shadow-dark-100">
                  <Badge className='background-light800_dark300 text-light800_dark200 mb-4 rounded-md font-inter text-base font-bold shadow'>
                  {tag.name}
                  </Badge>
                  {tag.description && <p className="text-light500_dark400 mb-4 font-inter text-xs font-normal">@{tag.description}</p>}

                  <p className="text-light500_dark400 font-inter text-xs font-medium">
                    <span className="font-inter text-sm font-medium text-primary-500">{tag.questions.length}+</span> questions
                  </p>

                </article>
              </Link>
              )
            })
            : <div className='flex w-full flex-col items-start'>
            <h5>There are no user yet</h5>
            <Link href="/sign-up" className='mt-4 font-bold text-accent-blue'>
              Go to sign up
            </Link>
          </div>
        }
        </div>
      </div>
      <div className="mt-10 flex w-full justify-center">
        <Pagination
          pageNumber={ searchParams.page ? +searchParams.page : 1 }
          hasNextPage={ results.isNextPage }
        />
      </div>
    </>
  )
}

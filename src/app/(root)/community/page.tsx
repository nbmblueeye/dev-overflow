import { getAllUsers } from '@/backend/controllers/user.controller'
import EmptyResult from '@/components/EmptyResult'
import FilterSelect from '@/components/shares/FilterSelect'
import Pagination from '@/components/shares/Pagination'
import RenderTag from '@/components/shares/RenderTag'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { interactedTags } from '@/constants'
import { UserFilters } from '@/constants/filter'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DevFlow | Community'
}

export default async function Page ({ searchParams }:{searchParams:{[key:string]:string} }) {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })

  return (
    <>
      <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All User</h2>
        <div className="flex flex-row flex-wrap gap-10">
            <LocalSearch
            route='/community'
            />
            <FilterSelect
              filters={UserFilters}
              addClass='Capitalize'
              route='/community'
            />
        </div>
        <div className="w-full">
        {
          results.users.length > 0
            ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {
                results.users.map((user) => {
                  return (
                    <article key={user._id} className="border-light700_dark400 z-20 flex flex-col items-center justify-between rounded-md border p-3 shadow-light-100 dark:shadow-dark-100">
                      <Link href={ `profile/${user.clerkId}` } className='mb-2 flex w-full flex-col items-center justify-center'>
                        <Image
                          src={user.picture}
                          width={100}
                          height={100}
                          alt='user avatar'
                          className='object-fit mb-4 rounded-full'
                        />
                        <h3 className="text-light800_dark200 mb-2 font-inter text-base font-bold">
                          {user.name}
                        </h3>
                        <p className="text-light500_dark400 mb-4 font-inter text-sm font-normal">@{user.username}</p>
                      </Link>
                      <div className="flex flex-row flex-wrap gap-2">
                          {
                            interactedTags.map((tag) => (
                            <RenderTag key={tag._id}
                              link={`/tags/${tag._id}`}
                              name={tag.name}
                              addClass="uppercase px-2 py-1"
                            />
                            ))
                          }
                      </div>
                    </article>
                  )
                })
              }
            </div>
            : <EmptyResult
              title="No User available"
              description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
              buttonText='Go to homepage'
              link='/'
            />
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

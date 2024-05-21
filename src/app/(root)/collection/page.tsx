import { getAllSavedQuestionToUser, getUserByClerkId } from '@/backend/controllers/user.controller'
import EmptyResult from '@/components/EmptyResult'
import QuestionCard from '@/components/cards/QuestionCard'
import FilterSelect from '@/components/shares/FilterSelect'
import Pagination from '@/components/shares/Pagination'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { QuestionFilters } from '@/constants/filter'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'DevFlow | Collection'
}

export default async function Page ({ searchParams }:{searchParams:{[key:string]:string} }) {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserByClerkId({ clerkId: userId })
  const results = await getAllSavedQuestionToUser({
    userId: mongoUser._id,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })

  return (
    <>
      <div className="flex w-full flex-col gap-10">
          <h2 className="text-light900_dark100 font-inter text-3xl font-bold">Saved Questions</h2>
          <div className="flex flex-row flex-wrap gap-10">
            <LocalSearch
            route='/collection'
            />
            <FilterSelect
              filters={ QuestionFilters }
              addClass='Capitalize'
              route='/collection'
            />
          </div>
          <div className="flex flex-col gap-8">
            {
              results.users.length > 0
                ? results.users.map((question:any) => {
                  return (
                  <QuestionCard
                    key={question._id}
                    id={question._id}
                    title={question.title}
                    tags={question.tags}
                    author={question.author}
                    upvotes={question.upvotes}
                    answers={question.answers}
                    views={question.views}
                    createdAt={question.createdAt}
                  />
                  )
                })
                : <EmptyResult
                  title="No Saved Question Selected"
                  description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
                  buttonText='Go to Question'
                  link='/question'
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

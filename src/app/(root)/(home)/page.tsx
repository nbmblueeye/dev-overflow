/* eslint-disable @next/next/no-async-client-component */
import { getAllQuestions } from '@/backend/controllers/question.controller'
import EmptyResult from '@/components/EmptyResult'
import QuestionCard from '@/components/cards/QuestionCard'
import ButtonC from '@/components/shares/ButtonC'
import FilterHome from '@/components/shares/FilterHome'
import FilterSelect from '@/components/shares/FilterSelect'
import Pagination from '@/components/shares/Pagination'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { filters } from '@/constants'

const Home = async ({ searchParams }:{ searchParams:{[key:string]:string} }) => {
  const results = await getAllQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })

  return (
    <>
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All Questions</h2>
        <ButtonC
         name="Ask a Question"
         link="/ask-question"
        />
      </div>
      <div className="flex flex-row gap-10 max-sm:flex-wrap md:flex-col">
        <LocalSearch
          route='/'
        />
        <FilterHome />
        <FilterSelect
          filters={filters}
          addClass='Capitalize md:hidden'
          route='/'
        />
      </div>
      <div className="flex flex-col gap-10">
        {
          results?.questions.length > 0
            ? results?.questions.map((question) => {
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
              title="No question available"
              description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
              buttonText='Go to Question'
              link='/ask-question'
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

export default Home

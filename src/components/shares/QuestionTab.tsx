import React from 'react'
import Pagination from './Pagination'
import QuestionCard from '../cards/QuestionCard'
import { getQuestionByUserId } from '@/backend/controllers/question.controller'

type Props ={
    userId: string,
    searchParams:{ [key:string]:string }
    clerkId: string,
}

const QuestionTab = async ({ userId, searchParams, clerkId }:Props) => {
  const questionResults = await getQuestionByUserId({
    userId: JSON.parse(userId),
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })
  return (
    <>
        <div className='flex flex-col gap-8'>
            {
              questionResults.questions.length > 0
                ? questionResults.questions.map(question => (
                <QuestionCard
                  key={question._id}
                  id={question._id}
                  title={question.title}
                  tags={question.tags}
                  author={question.author}
                  upvotes={question.upvotes}
                  answers={question.answers}
                  views={question.views}
                  createdAt={question.createdAt.toString()}
                  clerkId={JSON.parse(clerkId)}
                />
                ))
                : (<p className="text-light500_dark400 mb-6 font-inter text-base font-medium">
                There are no question
              </p>)
            }
        </div>
        <div className="mt-10 flex w-full justify-center">
            <Pagination
                pageNumber={ searchParams.page ? +searchParams.page : 1 }
                hasNextPage={ questionResults.isNextPage }
            />
        </div>
    </>
  )
}

export default QuestionTab

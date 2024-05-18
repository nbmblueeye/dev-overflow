import React from 'react'
import AnswerCardNormal from '../cards/AnswerCardNormal'
import { getAnswerByUserId } from '@/backend/controllers/answer.controller'
import Pagination from './Pagination'

type Props ={
    userId: string,
    searchParams:{ [key:string]:string }
    clerkId: string,
}

const AnswerTab = async ({ userId, searchParams, clerkId }:Props) => {
  const answerResults = await getAnswerByUserId({
    userId: JSON.parse(userId),
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 3
  })
  return (
    <>
        <div className='flex flex-col gap-8'>
            {
              answerResults.answers.length > 0
                ? answerResults.answers.map(answer => (
                <AnswerCardNormal
                  key={answer._id}
                  id={answer._id}
                  question={answer.question}
                  author={answer.author}
                  upvotes={answer.upvotes}
                  createdAt={answer.createdAt.toString()}
                  clerkId={JSON.parse(clerkId)}
                />
                ))
                : (<p className="text-light500_dark400 mb-6 font-inter text-base font-medium">
                There are no answer
              </p>)
            }
        </div>
        <div className="mt-10 flex w-full justify-center">
            <Pagination
                pageNumber={ searchParams.page ? +searchParams.page : 1 }
                hasNextPage={ answerResults.isNextPage }
            />
        </div>
    </>
  )
}

export default AnswerTab

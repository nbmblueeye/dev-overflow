import { getAllQuestionByTag } from '@/backend/controllers/tag.controller'
import EmptyResult from '@/components/EmptyResult'
import QuestionCard from '@/components/cards/QuestionCard'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import React from 'react'

const page = async ({ params }:{ params: {id: string}}) => {
  const tag = await getAllQuestionByTag({ tagId: params.id })
  return (
    <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold capitalize">{tag.name}</h2>
        <div className="flex flex-row flex-wrap gap-10">
            <LocalSearch
             route={`/tags/${tag._id}`}
            />
        </div>
        <div className="flex flex-col gap-8">
            {
              tag.questions.length > 0
                ? tag.questions.map((question:any) => {
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
                  title="No Tag available"
                  description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
                  buttonText='Go to Question'
                  link='/question'
                />
            }
          </div>
    </div>
  )
}

export default page

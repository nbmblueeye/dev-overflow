import { getQuestionToEdit } from '@/backend/controllers/question.controller'
import { getUserByClerkId } from '@/backend/controllers/user.controller'
import { FormQuestion } from '@/components/form/FormQuestion'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Page = async ({ params }:{params:{id:string}}) => {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserByClerkId({ clerkId: userId })
  const question = await getQuestionToEdit(params.id)

  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="text-light900_dark100 font-inter text-3xl font-bold">
        Edit Question
      </h1>
      <div>
        <FormQuestion
          userId={ JSON.stringify(mongoUser._id) }
          type="Edit"
          questionId={ JSON.stringify(question._id) }
          title={ question.title }
          description={ question.description }
          tagNames={ JSON.stringify(question.tags.map((tag:any) => tag.name)) }
        />
      </div>
    </div>
  )
}

export default Page

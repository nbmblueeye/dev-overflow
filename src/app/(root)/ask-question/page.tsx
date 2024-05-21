import { getUserByClerkId } from '@/backend/controllers/user.controller'
import { FormQuestion } from '@/components/form/FormQuestion'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'DevFlow | Ask Question'
}

const Page = async () => {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserByClerkId({ clerkId: userId })
  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="text-light900_dark100 font-inter text-3xl font-bold">
        Ask a public question
      </h1>
      <div>
        <FormQuestion
        userId={ JSON.stringify(mongoUser._id) }
        type="Add"
        />
      </div>
    </div>
  )
}

export default Page

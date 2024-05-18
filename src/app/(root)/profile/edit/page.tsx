import { getUserByClerkId } from '@/backend/controllers/user.controller'
import FormProfile from '@/components/form/FormProfile'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Profile = async () => {
  const { userId } = auth()
  if (!userId) return null
  const mongoUser = await getUserByClerkId({ clerkId: userId })
  return (
    <div className="flex w-full flex-col gap-10">
    <h1 className="text-light900_dark100 font-inter text-3xl font-bold">
      Edit Profile
    </h1>
    <div>
        <FormProfile
        user={JSON.stringify(mongoUser)}
        />
    </div>
  </div>
  )
}

export default Profile

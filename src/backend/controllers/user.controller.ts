'use server'
import { revalidatePath } from 'next/cache'
import connectToMongoDB from '../config/db'
import User from '../models/User'
import { createUserParams, deleteUserParams, updateUserParams } from '../type'
import Question from '../models/Question'

const createUser = async (params: createUserParams) => {
  try {
    connectToMongoDB()
    const user = await User.create(params)
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const updateUser = async (params: updateUserParams) => {
  const { clerkId, updateData, path } = params
  try {
    connectToMongoDB()
    const user = await User.findOneAndUpdate(
      { clerkId },
      updateData,
      {
        new: true
      }
    )

    revalidatePath(path)

    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const deleteUser = async (params: deleteUserParams) => {
  const { clerkId, path } = params
  try {
    connectToMongoDB()

    const isUserExist = await User.findOne({ clerkId })

    if (!isUserExist) {
      throw new Error('User does not exist')
    }

    // const userQuestionsId = await Question.find({clerkId:clerkId}).distinct('_id');

    await Question.deleteMany({ author: isUserExist._id })

    const user = await User.findByIdAndDelete(isUserExist._id)
    revalidatePath(path)

    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export { createUser, updateUser, deleteUser }

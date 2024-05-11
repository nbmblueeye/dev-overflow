'use server'
import { revalidatePath } from 'next/cache'
import connectToMongoDB from '../config/db'
import User from '../models/User'
import { createUserParams, deleteUserParams, updateUserParams } from '../type'
import Question from '../models/Question'

export async function createUser (params: createUserParams) {
  try {
    connectToMongoDB()
    const user = await User.create(params)
    console.log('User created')
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function updateUser (params: updateUserParams) {
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
    console.log('User updated')
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function deleteUser (params: deleteUserParams) {
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
    console.log('User deleted')
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function getAllUsers () {
  try {
    connectToMongoDB()
    const users = await User.find({})
    return users
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

'use server'
import { revalidatePath } from 'next/cache'
import connectToMongoDB from '../config/db'
import User from '../models/User'
import { createUserParams, deleteUserParams, editUserProfileParams, getAllSavedQuestionToUserParams, getAllUsersParams, getHandleSavedQuestionParams, getUserByIdParams, updateUserParams } from '../type'
import Question from '../models/Question'
import Tag from '../models/Tag'
import Answer from '../models/Answer'
import { FilterQuery } from 'mongoose'

export const createUser = async (params: createUserParams) => {
  try {
    connectToMongoDB()
    const { clerkId, name, username, email, picture } = params
    const user = await User.create({ clerkId, name, username, email, picture })
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export const updateUser = async (params: updateUserParams) => {
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
    throw new Error('Error Update User: ' + error)
  }
}

export const deleteUser = async (params: deleteUserParams) => {
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

export async function getAllUsers (params: getAllUsersParams) {
  try {
    connectToMongoDB()

    const { searchQuery, filter, page = 1, pageSize = 10 } = params
    const skipPage = (page - 1) * pageSize

    const query:FilterQuery<typeof User> = {}
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOption:any = {}
    switch (filter) {
      case 'new_users':
        sortOption = { joinedAt: -1 }
        break
      case 'old_users':
        sortOption = { joinedAt: 1 }
        break
      case 'top_contributors':
        sortOption = { reputation: -1 }
        break
      default:
        sortOption = { joinedAt: -1 }
        break
    }
    const users = await User.find(query)
      .skip(skipPage)
      .limit(pageSize)
      .sort(sortOption)

    const totalUsers = await User.countDocuments()
    const isNextPage = totalUsers > skipPage + users.length

    return { users, isNextPage }
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function getUserByClerkId (params: getUserByIdParams) {
  try {
    connectToMongoDB()
    const { clerkId } = params

    const user = await User.findOne({ clerkId })
    return user
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export const savedQuestionToUser = async (params: getHandleSavedQuestionParams) => {
  try {
    connectToMongoDB()
    const { userId, questionId, isSavedQuestion, path } = params

    let query = {}
    if (!isSavedQuestion) {
      query = { $addToSet: { saved: questionId } }
    } else {
      query = { $pull: { saved: questionId } }
    }
    const user = await User.findByIdAndUpdate(userId, query, { new: true })
    if (!user) {
      throw new Error('User not found: ' + userId)
    }

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export const getAllSavedQuestionToUser = async (params: getAllSavedQuestionToUserParams) => {
  try {
    connectToMongoDB()
    const { userId, searchQuery, filter, page = 1, pageSize = 10 } = params
    const skipPage = (page - 1) * pageSize

    const query:FilterQuery<typeof User> = searchQuery ? { title: { $regex: new RegExp(searchQuery, 'i') } } : {}

    let sortOption:any = {}
    switch (filter) {
      case 'most_recent':
        sortOption = { createdAt: -1 }
        break
      case 'oldest':
        sortOption = { createdAt: 1 }
        break
      case 'most_voted':
        sortOption = { upvotes: -1 }
        break
      case 'most_viewed':
        sortOption = { views: -1 }
        break
      case 'most_answered':
        sortOption = { answers: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }

    const user = await User.findById(userId)
      .populate({
        path: 'saved',
        match: query,
        model: Question,
        options: {
          skip: skipPage,
          limit: pageSize,
          sort: sortOption
        },
        populate: [{ path: 'author', model: User, select: '_id name picture' }, { path: 'tags', model: Tag, select: '_id name' }]
      })

    if (!user) {
      throw new Error('Error No User Found')
    }
    const allUser = await User.findById(userId)
    const isNextPage = allUser.saved.length > skipPage + pageSize
    return { users: user.saved, isNextPage }
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function getUserInfoByClerkId (params: getUserByIdParams) {
  try {
    connectToMongoDB()
    const { clerkId } = params

    const user = await User.findOne({ clerkId })
    if (!user) {
      throw new Error('Error User Not Found')
    }

    const totalUserQuestion = await Question.countDocuments({ author: user._id })
    const totalUserAnswer = await Answer.countDocuments({ author: user._id })

    return {
      user,
      totalUserQuestion,
      totalUserAnswer
    }
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export async function editUserProfile (params: editUserProfileParams) {
  try {
    connectToMongoDB()
    const { userId, name, username, location, portfolioWebsite, bio, path } = params

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('Error User Not Found')
    }

    user.name = name
    user.username = username
    user.location = location || ''
    user.portfolioWebsite = portfolioWebsite || ''
    user.bio = bio
    user.save()

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error editing User profile: ' + error)
  }
}

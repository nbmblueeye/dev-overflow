'use server'
import connectToMongoDB from '../config/db'
import Question from '../models/Question'
import { revalidatePath } from 'next/cache'
import { createAnswerParams, deleteAnswerByIdParams, getAnswerByQuestionIDParams, getAnswerByUserIdParams, getAnswerVotesParams } from '../type'
import Answer from '../models/Answer'
import User from '../models/User'
import Interaction from '../models/Interaction'

const createAnswer = async (params: createAnswerParams) => {
  try {
    connectToMongoDB()
    const { author, question, content, path } = params
    const newAnswer = await Answer.create({ author, question, content })
    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: question },
      { $push: { answers: newAnswer._id } },
      { new: true }
    )

    // create new user interaction
    await Interaction.create({
      user: author,
      action: 'Create new answer',
      question,
      answer: newAnswer._id,
      tag: updatedQuestion.tags
    })
    // add new question reputation to question author
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } })

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const getAnswerByQuestionID = async (params: getAnswerByQuestionIDParams) => {
  try {
    connectToMongoDB()
    const { question } = params
    const answers = await Answer.find({ question }).populate('author', '_id clerkId name picture')
    return answers
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const answerUpVotes = async (params: getAnswerVotesParams) => {
  try {
    connectToMongoDB()
    const { userId, answerId, isUpvoted, isDownvoted, path } = params
    let query = {}
    if (isUpvoted) {
      query = { $pull: { upvotes: userId } }
    } else if (isDownvoted) {
      query = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId }
      }
    } else {
      query = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, query, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }
    revalidatePath(path)
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const answerDownVotes = async (params: getAnswerVotesParams) => {
  try {
    connectToMongoDB()
    const { userId, answerId, isUpvoted, isDownvoted, path } = params
    let query = {}
    if (isUpvoted) {
      query = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId }
      }
    } else if (isDownvoted) {
      query = {
        $pull: { downvotes: userId }
      }
    } else {
      query = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, query, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }
    revalidatePath(path)
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const getAnswerByUserId = async (params: getAnswerByUserIdParams) => {
  try {
    await connectToMongoDB()

    const { userId, page = 1, pageSize = 10 } = params
    const skipPage = (page - 1) * pageSize

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('No user found')
    }
    const answers = await Answer.find({ author: user._id })
      .populate({ path: 'question', model: Question, select: '_id title' })
      .populate({ path: 'author', model: User, select: '_id name clerkId picture' })
      .skip(skipPage)
      .limit(pageSize)
      .sort({ createdAt: -1 })

    const totalAnswers = await Answer.countDocuments({ author: user._id })
    const isNextPage = totalAnswers > skipPage + answers.length
    return { answers, isNextPage }
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

const deleteAnswerById = async (params: deleteAnswerByIdParams) => {
  try {
    await connectToMongoDB()
    const { answerId, path } = params
    const answer = await Answer.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }

    await Answer.deleteOne({ _id: answerId })
    await Interaction.deleteMany({ answer: answerId })
    await Question.updateMany(
      { answers: { $in: [answerId] } },
      { $pull: { answers: answerId } }
    )
    revalidatePath(path)
    return { status: 'deleting' }
  } catch (error) {
    throw new Error('Error Question: ' + error)
  }
}

export { createAnswer, getAnswerByQuestionID, answerUpVotes, answerDownVotes, getAnswerByUserId, deleteAnswerById }

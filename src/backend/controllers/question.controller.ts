'use server'
import connectToMongoDB from '../config/db'
import Question from '../models/Question'
import Tag from '../models/Tag'
import { revalidatePath } from 'next/cache'
import { createQuestionParams, deleteQuestionByIdParams, editQuestionParams, getAllQuestionsParams, getQuestionByIdParams, getQuestionByUserIdParams, getQuestionVotesParams, getRecommentQuestionsParams } from '../type'
import User from '../models/User'
import Answer from '../models/Answer'
import Interaction from '../models/Interaction'
import { FilterQuery } from 'mongoose'

const createQuestion = async (params: createQuestionParams) => {
  try {
    await connectToMongoDB()
    const { title, description, tags, author, path } = params
    const newQuestion = await Question.create({
      title,
      description,
      author
    })

    const tagForQuestion = []
    for (const tag of tags) {
      const newTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: newQuestion._id } },
        { new: true, upsert: true }
      )
      tagForQuestion.push(newTag._id)
    }

    if (tagForQuestion.length > 0) {
      await Question.findByIdAndUpdate(newQuestion._id, {
        $push: { tags: { $each: tagForQuestion } }
      })
    }

    // create new user interaction
    await Interaction.create({
      user: author,
      action: 'Create new question',
      question: newQuestion._id,
      tag: tagForQuestion
    })
    // add new question reputation to question author
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } })

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error create question: ' + error)
  }
}

const getQuestionToEdit = async (id:string) => {
  try {
    await connectToMongoDB()
    const question = await Question.findById(id)
      .populate({ path: 'tags', model: Tag })
    if (!question) {
      throw new Error('Question not found')
    }
    return question
  } catch (error) {
    throw new Error('Error editting question ' + error)
  }
}

const editQuestion = async (params: editQuestionParams) => {
  try {
    await connectToMongoDB()
    const { questionId, title, description, path } = params
    const question = await Question.findById(questionId)
      .populate({ path: 'author', model: User })
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'answers', model: Answer, populate: { path: 'author', model: User } })

    if (!question) {
      throw new Error('Question not found')
    }

    question.title = title
    question.description = description

    question.save()
    revalidatePath(path)
  } catch (error) {
    throw new Error('Error editting question ' + error)
  }
}

const getAllQuestions = async (params: getAllQuestionsParams) => {
  try {
    await connectToMongoDB()

    const { searchQuery, filter, page = 1, pageSize = 10 } = params

    const skipPage = (page - 1) * pageSize

    const query:FilterQuery<typeof Question> = {}
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { description: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOption:any = {}
    switch (filter) {
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      case 'most_voted':
        sortOption = { upvotes: -1 }
        break
      case 'unanswered':
        query.answers = { $size: 0 }
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }

    const questions = await Question.find(query)
      .populate({ path: 'author', model: User })
      .populate({ path: 'tags', model: Tag })
      .skip(skipPage)
      .limit(pageSize)
      .sort(sortOption)
    const totalQuestions = await Question.countDocuments(query)
    const isNextPage = totalQuestions > skipPage + questions.length

    return { questions, isNextPage }
  } catch (error) {
    throw new Error('Error get all quations: ' + error)
  }
}

const getRecommentQuestions = async (params: getRecommentQuestionsParams) => {
  try {
    await connectToMongoDB()

    const { userId, searchQuery, page = 1, pageSize = 10 } = params

    const isUser = await User.findOne({ clerkId: userId })
    if (!isUser) {
      throw new Error('User for recommendation question not found')
    }

    const skipPage = (page - 1) * pageSize

    const interactions = await Interaction.find({ user: isUser._id })
      .populate({ path: 'tags', model: Tag })

    const tags = interactions.reduce((acc, interaction) => {
      if (interaction.tags) {
        acc = acc.concat(interaction.tags)
      }
      return acc
    }, [])

    const tagsArr = [
      // @ts-ignore
      ...new Set(tags.map((tag) => tag._id))
    ]

    const query:FilterQuery<typeof Question> = {
      $and: [
        { tags: { $in: tagsArr } },
        { author: { $ne: isUser._id } }
      ]
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    }

    const questions = await Question.find(query)
      .populate({ path: 'author', model: User })
      .populate({ path: 'tags', model: Tag })
      .skip(skipPage)
      .limit(pageSize)

    const totalQuestions = await Question.countDocuments(query)
    const isNextPage = totalQuestions > questions.length + skipPage
    console.log(totalQuestions, isNextPage, skipPage)
    return { questions, isNextPage }
  } catch (error) {
    throw new Error('Error get all quations: ' + error)
  }
}

const getQuestionById = async (params: getQuestionByIdParams) => {
  try {
    await connectToMongoDB()
    const { _id, filter, page = 1, pageSize = 10 } = params
    const skipPage = (page - 1) * pageSize

    let sortOption:any = {}
    switch (filter) {
      case 'highestUpvotes':
        sortOption = { upvotes: -1 }
        break
      case 'lowestUpvotes':
        sortOption = { upvotes: 1 }
        break
      case 'recent':
        sortOption = { createdAt: -1 }
        break
      case 'old':
        sortOption = { createdAt: 1 }
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }

    const question = await Question.findById(_id)
      .populate({ path: 'author', model: User })
      .populate({ path: 'tags', model: Tag })
      .populate({
        path: 'answers',
        model: Answer,
        options: {
          skip: skipPage,
          limit: pageSize,
          sort: sortOption
        },
        populate: { path: 'author', model: User }
      })

    const allAnswers = await Question.findById(_id)
    const isNextPage = allAnswers.answers.length > skipPage + pageSize
    return { question, isNextPage }
  } catch (error) {
    throw new Error('Error get question by id: ' + error)
  }
}

const questionUpVotes = async (params: getQuestionVotesParams) => {
  try {
    await connectToMongoDB()
    const { userId, questionId, isUpvoted, isDownvoted, path } = params

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
    const question = await Question.findByIdAndUpdate(questionId, query, { new: true })
    if (!question) {
      throw new Error('Question not found')
    }
    // If user adding upvote
    await User.findByIdAndUpdate(userId, { $inc: { reputation: isUpvoted ? -1 : 1 } })

    // If user is upvoted
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: isUpvoted ? -10 : 10 } })

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error get question upvote: ' + error)
  }
}

const questionDownVotes = async (params: getQuestionVotesParams) => {
  try {
    await connectToMongoDB()
    const { userId, questionId, isUpvoted, isDownvoted, path } = params

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

    const question = await Question.findByIdAndUpdate(questionId, query, { new: true })

    if (!question) {
      throw new Error('Question not found')
    }

    // If user adding downvote
    await User.findByIdAndUpdate(userId, { $inc: { reputation: isDownvoted ? 2 : -2 } })

    // If user is downvote
    await User.findByIdAndUpdate(question.author, { $inc: { reputation: isDownvoted ? 10 : -10 } })

    revalidatePath(path)
  } catch (error) {
    throw new Error('Error get question downvote: ' + error)
  }
}

const getQuestionByUserId = async (params: getQuestionByUserIdParams) => {
  try {
    await connectToMongoDB()

    const { userId, page = 1, pageSize = 10 } = params
    const skipPage = (page - 1) * pageSize

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('No user found')
    }
    const questions = await Question.find({ author: user._id })
      .populate({ path: 'author', model: User, select: '_id name clerkId picture' })
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .skip(skipPage)
      .limit(pageSize)
      .sort({ createdAt: -1 })

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const isNextPage = totalQuestions > skipPage + questions.length
    return { questions, isNextPage }
  } catch (error) {
    throw new Error('Error get question by user id: ' + error)
  }
}

const deleteQuestionById = async (params: deleteQuestionByIdParams) => {
  try {
    await connectToMongoDB()
    const { questionId, path } = params
    const question = await Question.deleteOne({ _id: questionId })
    if (!question) {
      throw new Error('Question not found')
    }
    await Answer.deleteMany({ question: questionId })
    await Interaction.deleteMany({ question: questionId })
    await Tag.updateMany(
      { questions: { $in: [questionId] } },
      { $pull: { questions: questionId } }
    )
    revalidatePath(path)
    return { status: 'deleting' }
  } catch (error) {
    throw new Error('Error delete question: ' + error)
  }
}

const getHotQuestion = async () => {
  try {
    await connectToMongoDB()
    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5)
    return hotQuestions
  } catch (error) {
    throw new Error('Error get hot question: ' + error)
  }
}

export { createQuestion, getAllQuestions, getQuestionById, questionUpVotes, questionDownVotes, getQuestionByUserId, deleteQuestionById, getQuestionToEdit, editQuestion, getHotQuestion, getRecommentQuestions }

'use server'
import { FilterQuery } from 'mongoose'
import connectToMongoDB from '../config/db'
import Question from '../models/Question'
import Tag from '../models/Tag'
import User from '../models/User'
import { getAllQuestionByTagParams, getAllTagsParams } from '../type'

const getAllTags = async (params: getAllTagsParams) => {
  try {
    await connectToMongoDB()

    const { searchQuery, filter, page = 1, pageSize = 10 } = params

    const skipPage = (page - 1) * pageSize

    const query:FilterQuery<typeof Tag> = {}
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    }

    let sortOption:any = {}
    switch (filter) {
      case 'popular':
        sortOption = { questions: -1 }
        break
      case 'recent':
        sortOption = { createdAt: -1 }
        break
      case 'old':
        sortOption = { createdAt: 1 }
        break
      case 'name':
        sortOption = { name: 1 }
        break
      default:
        break
    }

    const tags = await Tag.find(query)
      .skip(skipPage)
      .limit(pageSize)
      .sort(sortOption)

    const totalTags = await Tag.countDocuments()
    const isNextPage = totalTags > skipPage + tags.length
    return { tags, isNextPage }
  } catch (error) {
    throw new Error('Can not get all Tag: ' + error)
  }
}

const getAllQuestionByTag = async (params: getAllQuestionByTagParams) => {
  try {
    await connectToMongoDB()
    const { tagId } = params

    const tag = await Tag.findById(tagId)
      .populate({
        path: 'questions',
        model: Question,
        options: { sort: { createdAt: -1 } },
        populate: [{ path: 'author', model: User, select: '_id name picture' }, { path: 'tags', model: Tag, select: '_id name' }]
      })

    if (!tag) {
      throw new Error('Error No Tag Found')
    }

    return tag
  } catch (error) {
    throw new Error('Can not get all Tag: ' + error)
  }
}

const getPopularTags = async () => {
  try {
    await connectToMongoDB()

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 }
    ])
    return popularTags
  } catch (error) {
    throw new Error('Get popular Tag: ' + error)
  }
}

export { getAllTags, getAllQuestionByTag, getPopularTags }

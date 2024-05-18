'use server'
import connectToMongoDB from '../config/db'
import Interaction from '../models/Interaction'
import Question from '../models/Question'
import { addUserViewQuestionParams } from '../type'

const addUserViewQuestion = async (params: addUserViewQuestionParams) => {
  try {
    await connectToMongoDB()

    const { userId, questionId, userAction } = params
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })
    if (userId) {
      const isExistedInteraction = await Interaction.findOne({
        user: userId,
        action: userAction,
        question: questionId
      })

      if (isExistedInteraction) {
        console.log('User was viewed question: ' + questionId)
      } else {
        await Interaction.create({
          user: userId,
          action: userAction,
          question: questionId
        })
      }
    }
  } catch (error) {
    throw new Error('Add user view question error: ' + error)
  }
}

export { addUserViewQuestion }

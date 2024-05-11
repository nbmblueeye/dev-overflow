'use server'
import connectToMongoDB from '../config/db'

const createQuestion = async () => {
  try {
    connectToMongoDB()
  } catch (error) {
    throw new Error('Error Creating User: ' + error)
  }
}

export { createQuestion }

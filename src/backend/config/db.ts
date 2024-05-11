import mongoose from 'mongoose'

let isConnected:boolean = false

const connectToMongoDB = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.NEXT_MONGODB_URI) {
    throw new Error('MongoDB URL must be provided')
  }

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    const db = await mongoose.connect(process.env.NEXT_MONGODB_URI, { dbName: 'devOverFlow' })
    isConnected = true
    console.log(`Data base is connected to ${db.connection.host}`)
  } catch (error) {
    console.log('Error connecting to MongoDB', error)
  }
}

export default connectToMongoDB

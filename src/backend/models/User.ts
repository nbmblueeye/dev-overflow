import { Schema, Document, models, model } from 'mongoose'

  interface IUser extends Document {
    clerkId: string,
    name: string,
    username: string,
    email: string,
    password?: string,
    bio?: string,
    picture?: string,
    location?: string,
    portfolioWebsite?: string,
    reputation: number,
    saved?: Schema.Types.ObjectId[],
    joinedAt: Date,
  }

const userSchema = new Schema< IUser >({
  clerkId: { type: String, required: true },
  name: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  joinedAt: { type: Date, default: Date.now() }
})

const User = models.User || model< IUser >('User', userSchema)

export default User

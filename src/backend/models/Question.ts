import { Schema, Document, models, model } from 'mongoose'

interface IQuestion extends Document {
    title: string,
    description: string,
    tags: Schema.Types.ObjectId[],
    views:number,
    upvotes: Schema.Types.ObjectId[],
    downvotes: Schema.Types.ObjectId[],
    answers: Schema.Types.ObjectId[],
    author: Schema.Types.ObjectId,
    createdAt: Date,
}

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  author: { type: Schema.Types.ObjectId, ref: 'Answer' },
  createdAt: { type: Date, default: Date.now() }
})

const Question = models.Question || model('Question', questionSchema)
export default Question

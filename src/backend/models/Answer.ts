import { Schema, Document, models, model } from 'mongoose'

interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId,
  content: string,
  upvotes: Schema.Types.ObjectId[],
  downvotes: Schema.Types.ObjectId[],
}

const answerSchema = new Schema< IAnswer >({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

const Answer = models.Answer || model< IAnswer >('Answer', answerSchema)

export default Answer

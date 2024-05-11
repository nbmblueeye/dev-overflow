import { Schema, Document, models, model } from "mongoose";

interface IAnswer extends Document {
    author: Schema.Types.ObjectId;
    questions: Schema.Types.ObjectId,
    content: string,
    upvotes: Schema.Types.ObjectId[],
    downvotes: Schema.Types.ObjectId[],
    createdOn: Date;
  }
  
const answerSchema = new Schema< IAnswer >({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    questions: {type:Schema.Types.ObjectId, ref:"Question"},
    content: { type: String, required: true },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdOn: { type: Date, default: Date.now() },
})

const Answer = models.Answer || model< IAnswer >('Answer', answerSchema);

export default Answer;
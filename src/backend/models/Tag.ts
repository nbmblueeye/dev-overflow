import { Schema, Document, models, model } from "mongoose";

interface ITag extends Document {
    name: string,
    questions: Schema.Types.ObjectId[],
    followers: Schema.Types.ObjectId[],
    createdOn: Date;
  }
  
const tagSchema = new Schema< ITag >({
    name: { type: String, required: true, unique: true },
    questions: [{type:Schema.Types.ObjectId, ref:"Question"}],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    createdOn: { type: Date, default: Date.now() },
})

const Tag = models.Tag || model< ITag >('Tag', tagSchema);

export default Tag;
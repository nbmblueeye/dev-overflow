'use server'
import connectToMongoDB from '../config/db'
import Question from '../models/Question'
import Answer from '../models/Answer'
import User from '../models/User'
import Tag from '../models/Tag'

const searchTypes = ['question', 'answer', 'user', 'tag']
const handleGlobalSerach = async (params:{global:string, type: string}) => {
  try {
    await connectToMongoDB()
    const { global, type } = params

    let results:any = []
    const searchs = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Tag, searchField: 'name', type: 'tag' }
    ]

    if (!type || !searchTypes.includes(type)) {
      for (const search of searchs) {
        const { model, searchField, type } = search
        const result = await model.find({ [searchField]: { $regex: global, $options: 'i' } }).limit(2)
        if (result && result?.length > 0) {
          const newResult = result.map(item => ({
            id: type === 'answer' ? item.question : type === 'user' ? item.clerkId : item._id,
            type,
            title: type === 'answer' ? `Answer containing ${global}` : type === 'question' ? item.title : type === 'user' ? `For User name ${item.name}` : `For Tag name ${item.name}`
          }))
          results = [...results, ...newResult]
        }
      }
    } else {
      const activeType = searchs.find(search => search.type === type)
      if (activeType) {
        const { model, searchField, type } = activeType
        const result = await model.find({ [searchField]: { $regex: global, $options: 'i' } }).limit(8)
        if (result && result?.length > 0) {
          const newResult = result.map(item => ({
            id: type === 'answer' ? item.question : type === 'user' ? item.clerkId : item._id,
            type,
            title: type === 'answer' ? `Answer containing ${global}` : type === 'question' ? item.title : type === 'user' ? `For User name ${item.name}` : `For Tag name ${item.name}`
          }))
          results = [...results, ...newResult]
        }
      }
    }

    return JSON.stringify(results)
  } catch (error) {
    throw new Error('Error Global search: ' + error)
  }
}

export { handleGlobalSerach }

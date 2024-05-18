import React from 'react'
import MetaTag from '../shares/MetaTag'
import ParseHTML from '../shares/ParseHTML'
import Vote from '../shares/Vote'

type Props = {
  userId: string,
  authorId: string,
  authorPicture: string,
  authorName: string,
  answerId: string,
  upvoted: any,
  downvoted: any
  content: string
}
const AnswerCard = ({
  userId,
  authorId,
  authorPicture,
  authorName,
  answerId,
  upvoted,
  downvoted,
  content
}:Props) => {
  return (
    <div className='border-light700_dark400 rounded-md border px-6 py-4 shadow-light-100 dark:shadow-dark-100'>
      <div className="mb-4 flex flex-row flex-wrap justify-between">
        <MetaTag
          metaLink={`/profile/${authorId}`}
          iconUrl={ authorPicture }
          textSize="text-base font-semibold"
          data={authorName}
          title=""
          imageClass="rounded-full"
        />
      <div className="flex flex-row gap-2">
        <Vote
          type="Answer"
          itemId={ JSON.stringify(answerId) }
          userId={ JSON.stringify(userId) }
          upvoted={ upvoted.length }
          downvoted={ downvoted.length }
          isUpvoted={ upvoted.includes(userId) }
          isDownvoted={ downvoted.includes(userId)}
        />
      </div>
      </div>
      <ParseHTML content={content} />
    </div>
  )
}

export default AnswerCard

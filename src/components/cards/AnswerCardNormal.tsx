import Link from 'next/link'
import React from 'react'
import MetaTag from '../shares/MetaTag'
import changeTimeToHumenRead from '@/lib/TimeFormat'
import EditDelete from '../shares/EditDelete'

type Props = {
    id: string,
    question:{
      _id: string,
      title: string
    },
    author:{
      _id: string,
      name:string,
      picture: string,
      clerkId: string,
    },
    upvotes:string[],
    createdAt: string,
    clerkId?: string,
}

const AnswerCardNormal = ({
  id,
  question,
  author,
  upvotes,
  createdAt,
  clerkId
}:Props) => {
  const showEditDelete = clerkId && clerkId === author.clerkId
  return (
    <div className="border-light700_dark400 relative rounded-md border px-10 py-8 shadow-light-100 dark:shadow-dark-100">
      <Link href={`/question/${question._id}`}>
        <h3 className="text-light900_dark300 hover-light700_dark400 mb-6 w-fit p-2 font-inter text-xl font-bold">
          {question.title}
        </h3>
      </Link>
      {
        showEditDelete && <EditDelete type="Answer" itemId={JSON.stringify(id)} />
      }
      <div className="mt-8 flex flex-row flex-wrap items-end justify-between gap-4">
        <MetaTag
          metaLink=""
          iconUrl={author.picture}
          textSize="font-medium text-base me-1"
          data={`${author.name} .`}
          title={`Asked at ${changeTimeToHumenRead(createdAt)}`}
          imageClass="inverted-colors"
        />
        <div className="flex flex-row flex-wrap gap-6">
          <MetaTag
            metaLink=""
            iconUrl="/assets/icons/like.svg"
            textSize="font-medium text-sm"
            data={`${upvotes.length}`}
            title=" Votes"
            imageClass="accent-blue"
          />
        </div>
      </div>
  </div>
  )
}

export default AnswerCardNormal

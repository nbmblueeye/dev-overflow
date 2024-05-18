import React from 'react'
import RenderTag from '../shares/RenderTag'
import MetaTag from '../shares/MetaTag'
import changeTimeToHumenRead from '@/lib/TimeFormat'
import Link from 'next/link'
import EditDelete from '../shares/EditDelete'
import { formatNumber } from '@/lib/utils'

type Props = {
  id: string,
  title: string,
  tags: {
    _id: string,
    name: string,
  }[],
  author:{
    _id: string,
    name:string,
    picture: string,
    clerkId: string,
  },
  upvotes:string[],
  answers:string[],
  views:number
  createdAt: string,
  clerkId?:string
}
const QuestionCard = (
  {
    id,
    title,
    tags,
    author,
    upvotes,
    answers,
    views,
    createdAt,
    clerkId
  }:Props
) => {
  const showEditDelete = clerkId && clerkId === author.clerkId

  return (
    <div className="border-light700_dark400 relative rounded-md border px-10 py-8 shadow-light-100 dark:shadow-dark-100">
      <Link href={`/question/${id}`}>
        <h3 className="text-light900_dark300 hover-light700_dark400 mb-6 w-fit p-2 font-inter text-xl font-bold">
          {title}
        </h3>
      </Link>
      {
        showEditDelete && <EditDelete type="Question" itemId={JSON.stringify(id)} />
      }
      <div className="flex flex-row flex-wrap gap-4">
      {
        tags.length > 0 &&
        tags.map((tag:any) => {
          return (
            <RenderTag key={tag._id}
              link={`/tags/${tag._id}`}
              name={tag.name}
              addClass="uppercase px-4 py-2"
              showCount={false}
              totalQuestion=''
            />
          )
        })
      }
      </div>
      <div className="mt-8 flex flex-row flex-wrap items-end justify-between gap-4">
        <MetaTag
          metaLink=""
          iconUrl={author.picture}
          textSize="font-medium text-base me-1"
          data={`${author.name} .`}
          title={`Asked at ${changeTimeToHumenRead(createdAt)}`}
          imageClass="rounded-full object-contain"
        />
        <div className="flex flex-row flex-wrap gap-6">
          <MetaTag
            metaLink=""
            iconUrl="/assets/icons/like.svg"
            textSize="font-medium text-sm"
            data={ formatNumber(upvotes.length) }
            title=" Votes"
            imageClass="accent-blue"
          />
          <MetaTag
            metaLink=""
            iconUrl="/assets/icons/message.svg"
            textSize="font-medium text-sm"
            data={ formatNumber(answers.length) }
            title=" Answers"
            imageClass="accent-blue"
          />
          <MetaTag
            metaLink=""
            iconUrl="/assets/icons/eye.svg"
            textSize="font-medium text-sm"
            data={ formatNumber(views) }
            title=" Views"
            imageClass="accent-blue"
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard

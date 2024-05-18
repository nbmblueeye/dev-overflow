import { getQuestionById } from '@/backend/controllers/question.controller'
import { getUserByClerkId } from '@/backend/controllers/user.controller'
import AnswerCard from '@/components/cards/AnswerCard'
import FormAnswer from '@/components/form/FormAnswer'
import FilterSelect from '@/components/shares/FilterSelect'
import MetaTag from '@/components/shares/MetaTag'
import Pagination from '@/components/shares/Pagination'
import ParseHTML from '@/components/shares/ParseHTML'
import RenderTag from '@/components/shares/RenderTag'
import Vote from '@/components/shares/Vote'
import { AnswerFilters } from '@/constants/filter'
import changeTimeToHumenRead from '@/lib/TimeFormat'
import { formatNumber } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

type Props = {
  params:{id:string},
  searchParams:{[key:string]:string}
}
const Page = async ({ params, searchParams }:Props) => {
  const { userId } = auth()
  if (!userId) return null
  const user = await getUserByClerkId({ clerkId: userId })
  const results = await getQuestionById({
    _id: params.id,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 20
  })
  return (
    <>
      <div className="mb-4 flex flex-row flex-wrap justify-between gap-8">
        <MetaTag
          metaLink={`/profile/${results.question.author._id}`}
          iconUrl={ results.question.author.picture }
          textSize="text-base font-semibold"
          data={`${results.question.author.username}`}
          title=""
          imageClass="rounded-full object-contain"
        />
        <Vote
          type="Question"
          itemId={ JSON.stringify(results.question._id) }
          userId={ JSON.stringify(user._id) }
          upvoted={ results.question.upvotes.length }
          downvoted={ results.question.downvotes.length }
          isUpvoted={ results.question.upvotes.includes(user._id) }
          isDownvoted={ results.question.downvotes.includes(user._id)}
          isSaved={user.saved.includes(results.question._id) }
        />
      </div>
      <h2 className="text-light800_dark200 mb-4 font-inter text-2xl font-semibold">{results.question.title}</h2>
      <div className="mb-8 mt-6 flex flex-row flex-wrap gap-8">
        <MetaTag
          metaLink=""
          iconUrl='/assets/icons/clock-2.svg'
          textSize="font-medium text-sm"
          data=""
          title={`Asked at ${changeTimeToHumenRead(results.question.createdAt)}`}
          imageClass="accent-blue"
          />
        <MetaTag
          metaLink=""
          iconUrl="/assets/icons/like.svg"
          textSize="font-medium text-sm"
          data={formatNumber(results.question.upvotes.length)}
          title=" Votes"
          imageClass="accent-blue"
        />
        <MetaTag
          metaLink=""
          iconUrl="/assets/icons/message.svg"
          textSize="text-sm font-semibold"
          data={formatNumber(results.question.answers.length)}
          title=" Answers"
          imageClass="accent-blue"
        />
        <MetaTag
          metaLink=""
          iconUrl="/assets/icons/eye.svg"
          textSize="font-medium text-sm"
          data={formatNumber(results.question.views)}
          title=" Views"
          imageClass="accent-blue"
        />
      </div>
      <ParseHTML content={results.question.description} />
      <div className="my-8 flex flex-row flex-wrap gap-8">
          {
            results.question.tags.map((tag:any) => (
              <RenderTag key={tag._id}
                link={`/tags/${tag._id}`}
                name={tag.name}
                addClass="uppercase px-4 py-2"
              />
            ))
          }
      </div>
      <div className="my-8 flex flex-row flex-wrap justify-between gap-8">
        <p className="mb-4 font-inter text-lg font-medium text-primary-500">{results.question.answers.length} Answers</p>
        <FilterSelect
          filters={AnswerFilters}
          addClass='Capitalize'
          route={`/question/${results.question._id}`}
        />
      </div>
      {
        results.question.answers.length > 0 &&
        (<>
          <div className="mb-8 flex flex-col gap-4">
            {results.question.answers.map((answer:any) => {
              return (
                <AnswerCard
                  key={answer._id}
                  userId={ user._id }
                  authorId={answer.author._id}
                  authorPicture={answer.author.picture}
                  authorName={answer.author.name}
                  answerId={answer._id}
                  upvoted={ answer.upvotes }
                  downvoted={ answer.downvotes }
                  content={ answer.content }
                />
              )
            })}
          </div>
          <div className="mt-10 flex w-full justify-center">
            <Pagination
              pageNumber={ searchParams.page ? +searchParams.page : 1 }
              hasNextPage={ results.isNextPage }
            />
          </div>
        </>)
      }
      <FormAnswer
        author={JSON.stringify(user._id)}
        question={JSON.stringify(results.question._id)}
      />
   </>
  )
}

export default Page

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from './RenderTag'
import { getHotQuestion } from '@/backend/controllers/question.controller'
import { getPopularTags } from '@/backend/controllers/tag.controller'
import { formatNumber } from '@/lib/utils'

const RightSideBar = async () => {
  const hotQuestions = await getHotQuestion()
  const popularTags = await getPopularTags()
  return (
    <section className='custom-scroll border-light800_dark200 sticky right-0 top-0 z-0 h-[calc(100vh-80px)] overflow-y-auto border-l px-4 pb-8 pt-10 shadow-light-100 dark:shadow-dark-100 max-lg:hidden lg:w-[350px]'>
      <div className="mb-12 w-full">
        <h3 className="text-light900_dark300 mb-4 px-4 font-inter text-xl font-bold">Top Questions</h3>
        {
          hotQuestions.length &&
          hotQuestions.map((question:any, index:any) => {
            return (
              <Link key={index} href={`/question/${question._id}`} className="hover-light700_dark400 mb-2 flex flex-row items-center justify-between p-4">
                <p className="text-light800_dark200 font-inter text-sm font-medium">{question.title}</p>
                <Image
                  src='/assets/icons/chevron-right.svg'
                  width={20}
                  height={20}
                  alt="chevron-right"
                  className='inverted-colors'
                />
              </Link>
            )
          }
          )
        }
      </div>
      <div className="w-full">
        <h3 className="text-light900_dark300 mb-8 px-4 font-inter text-xl font-bold">Popular Tags</h3>
        <div className="flex flex-col gap-6">
          {
            popularTags.map((tag:any, index:any) => {
              return (
                <RenderTag key={index}
                  link={`/tags/${tag._id}`}
                  showCount={true}
                  totalQuestion={formatNumber(tag.numberOfQuestions)}
                  name={tag.name}
                  addClass="uppercase px-4 py-2"
                />
              )
            }
            )
          }
        </div>
      </div>
    </section>
  )
}

export default RightSideBar

import { popularTags, questions } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from './RenderTag'

const RightSideBar = () => {
  return (
    <section className='sticky right-0 top-0 overflow-y-auto h-[calc(100vh-80px)] custom-scroll lg:w-[350px] pt-10 pb-8 px-4 border-l border-light800_dark200 z-0 shadow-light-100 dark:shadow-dark-100 max-lg:hidden'>
      <div className="w-full mb-12">
        <h3 className="font-inter font-bold text-xl text-light900_dark300 px-4 mb-4">Top Questions</h3>
        {
          questions.map((question:any, index:any) => {
            return(
              <Link key={index} href={`questions/${question._id}`} className="flex flex-row justify-between items-center p-4 mb-2 hover-light700_dark400">
                
                  <p className="font-inter font-medium text-sm text-light800_dark200">{question.title}</p>
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
        <h3 className="font-inter font-bold text-xl text-light900_dark300 px-4 mb-8">Popular Tags</h3>
        <div className="flex flex-col gap-6">
          {
            popularTags.map((popularTag:any, index:any) => {
              return(
                <RenderTag key={index} {...popularTag}/>
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
'use client'
import FilterHome from '@/components/shares/FilterHome'
import FilterSelect from '@/components/shares/FilterSelect'
import MetaTag from '@/components/shares/MetaTag'
import RenderTag from '@/components/shares/RenderTag'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { Button } from '@/components/ui/button'
import { questionCards } from '@/constants'

const Page = () => {

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All Questions</h2>
        <Button
          className="bg-primary-500 px-4 py-3 font-inter text-base font-medium text-primary-100 hover:text-light-700"
          onClick={() => {}}
        >
          Ask a question
        </Button>
      </div>
      <div className="flex flex-row gap-10 max-sm:flex-wrap md:flex-col">
        <LocalSearch/>
        <FilterHome />
        <FilterSelect/>
      </div>
      <div className="flex flex-col gap-10">
        {
          questionCards.map((questionCard, index) => {
            return (
              <div key={index} className="text-light800_dark200 border-light700_dark400 rounded-md border px-10 py-8 font-inter text-xl font-semibold shadow-light-100 dark:shadow-dark-100">
                  <h3 className="text-light900_dark300 mb-6 font-inter text-xl font-bold">
                    {questionCard.title}
                  </h3>
                  <div className="flex flex-row flex-wrap gap-4">
                  {
                    questionCard.tags.length > 0 && questionCard.tags.map((tag, index) => {
                      return (
                        <RenderTag key={index} {...tag}/>
                      )
                    })
                  }
                  </div>
                  <div className="mt-8 flex flex-row flex-wrap items-end justify-between">
                      <MetaTag
                        metaLink="#"
                        iconUrl={questionCard.author.picture ? questionCard.author.picture : '/assets/icons/avatar.svg'}
                        textSize="font-medium text-base"
                        data={`${questionCard.author.name} . `}
                        title={`askedAt ${questionCard.createdAt}`}
                        imageClass="inverted-colors"
                      />
                      <div className="flex flex-row flex-wrap gap-6">
                        <MetaTag
                          metaLink=""
                          iconUrl="/assets/icons/like.svg"
                          textSize="font-normal text-xs"
                          data={`${questionCard.votes} `}
                          title=" Votes"
                          imageClass="accent-blue"
                        />
                        <MetaTag
                          metaLink=""
                          iconUrl="/assets/icons/message.svg"
                          textSize="font-normal text-xs"
                          data={`${questionCard.answers} `}
                          title=" Answers"
                          imageClass="accent-blue"
                        />
                        <MetaTag
                          metaLink=""
                          iconUrl="/assets/icons/eye.svg"
                          textSize="font-normal text-xs"
                          data={`${questionCard.answers} `}
                          title=" Views"
                          imageClass="accent-blue"
                        />
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Page 

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import ButtonC from '@/components/shares/ButtonC'

const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All Questions</h2>
        <ButtonC
         name="Ask a Question"
         link="/ask-question"
        />
      </div>
      <div className="flex flex-row gap-4">
        <Skeleton className="size-20 bg-primary-100" />
        <Skeleton className="h-20 w-[300px] bg-primary-100" />
      </div>
      <div className="flex flex-col gap-8">
        {
            [1, 2].map(item => (
                <Skeleton className="h-[125px] w-full rounded-xl bg-primary-100" key={item}/>
            ))
        }
      </div>
    </div>
  )
}

export default Loading

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <>
    <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">Saved Questions</h2>
        <div className="flex flex-row flex-wrap gap-10">
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
  </>
  )
}

export default Loading

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All Tags</h2>
        <div className="flex flex-row flex-wrap gap-10">
            <Skeleton className="size-20 bg-primary-100" />
            <Skeleton className="h-20 w-[300px] bg-primary-100" />
        </div>
        <div className="w-full">
           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {
                [1, 2, 3, 4].map(item => (
                    <Skeleton className="h-[200px] w-full rounded-xl bg-primary-100" key={item}/>
                ))
            }
          </div>
        </div>
    </div>
  )
}

export default Loading

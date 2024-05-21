import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-row gap-4">
        <Skeleton className="size-20 bg-primary-100" />
        <Skeleton className="h-20 w-[300px] bg-primary-100" />
      </div>
      <div className="flex flex-col gap-8">
        {
            [1, 2].map(item => (
                <Skeleton className="h-[200px] w-full rounded-xl bg-primary-100" key={item}/>
            ))
        }
      </div>
    </div>
  )
}

export default Loading

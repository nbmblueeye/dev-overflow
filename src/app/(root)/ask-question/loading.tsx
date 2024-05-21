import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="text-light900_dark100 font-inter text-3xl font-bold">
        Ask a public question
      </h1>
      <div className="flex flex-col gap-8">

        <Skeleton className="h-[80px] w-full rounded-xl bg-primary-100"/>
        <Skeleton className="h-[260px] w-full rounded-xl bg-primary-100"/>
        <Skeleton className="h-[80px] w-full rounded-xl bg-primary-100"/>

      </div>
    </div>
  )
}

export default Loading

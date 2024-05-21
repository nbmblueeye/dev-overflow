import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
  return (
    <div className="flex w-full flex-col gap-10">
        <Skeleton className="size-10 bg-primary-100" />
        <Skeleton className="h-20 w-[300px] bg-primary-100" />
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

export default loading

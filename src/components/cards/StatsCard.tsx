import Image from 'next/image'
import React from 'react'

type Props = {
    imgUrl: string,
    value: number,
    title: string,
}

const StatsCard = ({ imgUrl, value, title }:Props) => {
  return (
    <div className='border-light700_dark400 flex flex-row gap-2 rounded-md border p-4 shadow-light-100 dark:shadow-dark-100'>
        <Image
          src={imgUrl}
          width={40}
          height={50}
          alt={title}
          className='object-contain'
        />
        <div className="flex flex-col">
            <p className={'text-light800_dark200 font-inter text-base font-semibold'}>{value}</p>
            <p className={'text-light800_dark200 font-inter text-sm font-medium'}>{title}</p>
        </div>
    </div>
  )
}

export default StatsCard

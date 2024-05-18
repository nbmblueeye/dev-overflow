'use client'
import React from 'react'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'

type Props = {
  link: string,
  name: string,
  showCount?:boolean,
  totalQuestion?:string,
  addClass: string,
}

const RenderTag = ({ link, name, showCount, totalQuestion, addClass }:Props) => {
  const router = useRouter()
  return (
    <div className="z-50 flex flex-row items-center justify-between" onClick={() => { router.push(link) } }>
      <Badge className={`background-light800_dark300 text-light500_dark400 hover-light700_dark400 rounded-md font-inter text-xs font-medium shadow ${addClass}`}>
        {name}
      </Badge>
      {showCount &&
      (<p className="text-light800_dark200 font-inter text-xs font-medium">{totalQuestion}</p>)
      }
    </div>
  )
}

export default RenderTag

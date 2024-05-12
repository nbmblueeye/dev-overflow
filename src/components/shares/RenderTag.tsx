'use client'
import React from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link'

type Props = {
  _id: string,
  name: string,
  showCount?:boolean,
  totalQuestion?:number,
  addClass: string,
}

const RenderTag = ({ _id, name, showCount, totalQuestion, addClass }:Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link href={`tags/${_id}`}>
        <Badge className={`background-light800_dark300 text-light500_dark400 hover-light700_dark400 rounded-md px-4 py-2 font-inter text-xs font-medium shadow ${addClass}`}>
          {name}
        </Badge>
      </Link>
      {
        showCount && <p className="text-light800_dark200 font-inter text-xs font-medium">{totalQuestion}</p>
      }
    </div>
  )
}

export default RenderTag

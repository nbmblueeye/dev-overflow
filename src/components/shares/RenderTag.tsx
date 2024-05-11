'use client'
import React from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const RenderTag = ({ ...tag }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link href={`tags/${tag._id}`}>
        <Badge className={'background-light800_dark300 text-light500_dark400 hover-light700_dark400 rounded-md px-4 py-2 font-inter text-xs font-medium uppercase shadow'}>
          {tag.name}
        </Badge>
      </Link>
      {
        tag.showCount && <p className="text-light800_dark200 font-inter text-xs font-medium">{tag.totalQuestion}</p>
      }
    </div>
  )
}

export default RenderTag

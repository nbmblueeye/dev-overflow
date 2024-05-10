'use client'
import React from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const RenderTag = ({...tag}) => {
  return (   
    <div className="flex flex-row justify-between items-center">
      <Link href={`tags/${tag._id}`}> 
        <Badge className={`shadow background-light800_dark300 text-xs font-inter font-medium text-light500_dark400 px-4 py-2 rounded-md uppercase hover-light700_dark400`}>
          {tag.name}
        </Badge>
      </Link>
      {
        tag.showCount && <p className="font-inter font-medium text-xs text-light800_dark200">{tag.totalQuestion}</p>
      }
    </div>
  )
}

export default RenderTag
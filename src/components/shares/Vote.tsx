'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Badge } from '../ui/badge'
import { questionDownVotes, questionUpVotes } from '@/backend/controllers/question.controller'
import { usePathname } from 'next/navigation'
import { answerDownVotes, answerUpVotes } from '@/backend/controllers/answer.controller'
import { savedQuestionToUser } from '@/backend/controllers/user.controller'
import { addUserViewQuestion } from '@/backend/controllers/interaction.controller'

type Props = {
    type:string,
    itemId:string,
    userId:string,
    upvoted:string,
    downvoted:string,
    isUpvoted:boolean,
    isDownvoted:boolean
    isSaved?:boolean
}

const Vote = ({
  type,
  itemId,
  userId,
  upvoted,
  downvoted,
  isUpvoted,
  isDownvoted,
  isSaved
}:Props) => {
  const pathName = usePathname()
  const handleVoted = async (action:string) => {
    if (type === 'Question') {
      if (action === 'upvote') {
        await questionUpVotes({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          isUpvoted,
          isDownvoted,
          path: pathName
        })
      } else if (action === 'downvote') {
        await questionDownVotes({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          isUpvoted,
          isDownvoted,
          path: pathName
        })
      }
    }

    if (type === 'Answer') {
      if (action === 'upvote') {
        await answerUpVotes({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          isUpvoted,
          isDownvoted,
          path: pathName
        })
      } else if (action === 'downvote') {
        await answerDownVotes({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          isUpvoted,
          isDownvoted,
          path: pathName
        })
      }
    }
  }

  const handleSavedQuestion = async () => {
    await savedQuestionToUser({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      isSavedQuestion: isSaved!,
      path: pathName
    })
  }

  const updateViewRef = useRef(true)
  useEffect(() => {
    if (updateViewRef.current) {
      if (type === 'Question') {
        const addView = async () => {
          await addUserViewQuestion({
            userId: JSON.parse(userId),
            userAction: 'view',
            questionId: JSON.parse(itemId)
          })
        }
        addView()
      }
    }
    return () => {
      updateViewRef.current = false
    }
  }, [itemId, userId, type])

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row">
        <Image
          src={`${isUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
          width={20}
          height={20}
          alt="upvoted"
          className='cursor-pointer transition duration-150 ease-in-out hover:scale-125'
          onClick={() => handleVoted('upvote')}
        />
        &nbsp;
        <Badge className='background-light800_dark200 text-light500_dark400 rounded-sm font-inter text-sm font-medium shadow'>
          {upvoted}
        </Badge>
      </div>
      <div className="flex flex-row">
        <Image
          src={`${isDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}`}
          width={20}
          height={20}
          alt="downvoted"
          className='cursor-pointer transition duration-150 ease-in-out hover:scale-125'
          onClick={() => handleVoted('downvote')}
        />
        &nbsp;
        <Badge className='background-light800_dark200 text-light500_dark400 rounded-sm font-inter text-sm font-medium shadow'>
          {downvoted}
        </Badge>
      </div>
      {
        type === 'Question' &&
        <Image
          src={`${isSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}`}
          width={20}
          height={20}
          alt="downvoted"
          className='ms-4 cursor-pointer transition duration-150 ease-in-out hover:scale-125'
          onClick={() => handleSavedQuestion()}
        />
      }
    </div>
  )
}

export default Vote

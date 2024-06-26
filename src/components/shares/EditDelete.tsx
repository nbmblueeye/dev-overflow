'use client'
import { deleteAnswerById } from '@/backend/controllers/answer.controller'
import { deleteQuestionById } from '@/backend/controllers/question.controller'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'
import { useToast } from '../ui/use-toast'

type Props = {
  type: string,
  itemId: string,
}

const EditDelete = ({ type, itemId }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()
  const handleDelete = async () => {
    if (type === 'Question') {
      const { status } = await deleteQuestionById({
        questionId: JSON.parse(itemId),
        path: pathName
      })

      if (status === 'deleting') {
        return toast({
          title: 'Success',
          description: 'Question is deleted successful'
        })
      }
    }

    if (type === 'Answer') {
      const { status } = await deleteAnswerById({
        answerId: JSON.parse(itemId),
        path: pathName
      })

      if (status === 'deleting') {
        return toast({
          title: 'Success',
          description: 'Answer is deleted successful'
        })
      }
    }
  }

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`)
  }

  return (
    <div className="absolute right-4 top-4 flex flex-row gap-4">
       {type !== 'Answer' && (<Image
        src='/assets/icons/edit.svg'
        width={16}
        height={16}
        alt='Edit'
        className='cursor-pointer object-contain transition duration-150 ease-in-out hover:scale-125'
        onClick={() => handleEdit()}
        />)}
        <Image
        src='/assets/icons/trash.svg'
        width={16}
        height={16}
        alt='Delete'
        className='cursor-pointer object-contain transition duration-150 ease-in-out hover:scale-125'
        onClick={() => handleDelete()}
        />
    </div>
  )
}

export default EditDelete

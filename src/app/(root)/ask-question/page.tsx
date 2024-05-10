import { FormQuestion } from '@/components/shares/FormQuestion'
import React from 'react'

const page = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="text-light900_dark100 font-inter text-3xl font-bold">
        Ask a public question
      </h1>

      <div>
        <FormQuestion/>
      </div>

    </div>
  )
}

export default page

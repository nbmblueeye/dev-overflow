'use client'
import { getAllUsers } from '@/backend/controllers/user.controller'
/* eslint-disable @next/next/no-async-client-component */

import FilterSelect from '@/components/shares/FilterSelect'
import LocalSearch from '@/components/shares/searchs/LocalSearch'
import { useEffect } from 'react'

export default function Page () {
  useEffect(() => {
    const initUser = async () => {
      const users = await getAllUsers()
      console.log(users)
    }
    initUser()
  }, [])

  return (
    <div className="flex w-full flex-col gap-10">
        <h2 className="text-light900_dark100 font-inter text-3xl font-bold">All User</h2>
        <div className="flex flex-row gap-10 max-sm:flex-wrap md:flex-col">
            <LocalSearch/>
            <FilterSelect/>
        </div>
        <div className="flex flex-col gap-10">
        </div>
    </div>
  )
}

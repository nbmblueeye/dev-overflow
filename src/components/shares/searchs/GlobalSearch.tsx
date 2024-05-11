import Image from 'next/image'
import React from 'react'

const GlobalSearch = () => {
  return (
    <div className="background-light800_dark200 border-light700_dark400 flex w-[600px] flex-row gap-4 rounded-lg border p-4 max-lg:hidden">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />
      <input type="text"
      className="
        no-focus
        text-light800_dark200
        flex-1
        border-none bg-transparent
        text-base font-normal
        outline-none
        placeholder:text-light-500"
      placeholder="Search anything globally..."
      />
    </div>
  )
}

export default GlobalSearch

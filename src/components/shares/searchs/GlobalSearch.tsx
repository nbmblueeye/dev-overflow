import Image from 'next/image'
import React from 'react'

const GlobalSearch = () => {
  return (
    <div className="w-[600px] p-4 background-light800_dark200 rounded-lg border border-light700_dark400 flex flex-row gap-4 max-lg:hidden">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />
      <input type="text" 
      className="
        flex-1
        bg-transparent 
        border-none 
        outline-none no-focus
        text-base font-normal 
        text-light800_dark200
        placeholder:text-light-500"
      placeholder="Search anything globally..."
      />
    </div>
  )
}

export default GlobalSearch
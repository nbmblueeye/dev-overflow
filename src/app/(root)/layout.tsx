import React from 'react'

import LeftSideBar from '@/components/shares/LeftSideBar'
import RightSideBar from '@/components/shares/RightSideBar'

const Layout = ({ children }:{children:React.ReactNode}) => {
  return (
    <main className='mx-auto flex flex-row justify-between'>
      <LeftSideBar/>
      <section className="w-full flex-1 px-8 pb-8 pt-10">
        {children}
      </section>
       <RightSideBar/>
    </main>
  )
}

export default Layout

import React from 'react'

const Layout = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className='flex h-screen w-full justify-center pt-12'>
        {
          children
        }
    </div>
  )
}

export default Layout

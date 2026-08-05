import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-black min-h-screen flex justify-center items-center'>
        <main className='max-w-lg mx-auto w-full h-full'>
            {children}
        </main>
    </div>
  )
}

export default layout
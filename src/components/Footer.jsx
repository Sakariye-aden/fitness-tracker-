import React from 'react'

const Footer = () => {
  return (
   
     <div className=' bg-gray-100 '>
          <div className='h-15 flex justify-center items-center'>
            <p>© copyright resever <span className='text-orange-500'>Alpha</span> {new Date().getFullYear()}</p>
          </div>
     </div>
  )
}

export default Footer
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router'

const ChatUser = ({userInfo}) => {

   const [message , setMassege]= useState('')

    const handleSubmit = (e)=>{
       e.preventDefault();

       console.log(message);
    }



  return (
    <div className='bg-white '>
       <div className='flex flex-col min-h-screen '>
         {/* Top  */}
          <div className=''>
            <div className='h-15 flex items-center p-6 '>
              {/* profile */}
              <img src={userInfo.avatar_url} alt="profile" className='h-13 w-13 border-1 border-gray-200 rounded-full '/>
              <span className='text-lg font-medium text-blue-400 mx-3'>{userInfo.username}</span>
              <span className='block w-3 h-3 mt-0.5 rounded-full bg-green-500'></span> 
            </div>
            <div className='bg-gray-300 h-0.5  rounded-md my-1'></div>
          </div>
           
            {/*Messagess text  */}
            <div className=' flex-1'>
                Cool
            </div>

            {/* button */}
            <div className='h-20 bg-gray-100 flex justify-center items-center sticky bottom-0'>
                <form onSubmit={handleSubmit} className='w-full p-2'>
                   <input type="text" 
                     className='p-2 w-6/7 text-lg bg-white focus:outline-none border-1 rounded-md border-gray-500'
                     onChange={(e)=>setMassege(e.target.value)}
                     value={message}
                   />
                   <button type='submit' className='ml-2 '>
                        <IoSend  className='text-xl'/>
                   </button>
                </form>
            </div>
       </div>
    </div>
  )
}

export default ChatUser
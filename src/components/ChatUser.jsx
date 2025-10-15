import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import supabase from '../lib/supabase'

const ChatUser = ({userInfo}) => {

   const [message , setMassege]= useState('')
   const [isSaving , setisSaving]= useState(false)
    
   const { user } = useAuth()

    const handleSubmit = async (e)=>{
       e.preventDefault();
           
          setisSaving(true)

             try {

              const {data , error } = await supabase
                  .from('chat')
                  .insert({
                     sender_id:user.id,
                     receiver_id:userInfo.id,
                     message:message
                  })
                  

                  if(error) throw error

             } catch (error) {
                 console.error('inser error :',error);
             }finally{
              setisSaving(false)
             }     
    }



  return (
    <div className='bg-white border-r-1 border-gray-300'>
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
                   <button type='submit' className='ml-2 border-1 border-gray-400 p-2 px-4 rounded-lg'>
                     {
                       isSaving ? <div className='animate-spin h-5 w-5 border-l-1 border-orange-500 border-r-1 rounded-full'></div>
                       : <IoSend  className='text-xl'/>
                     }
                       
                   </button>
                </form>
            </div>
       </div>
    </div>
  )
}

export default ChatUser
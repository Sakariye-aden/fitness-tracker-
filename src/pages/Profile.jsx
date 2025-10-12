import React, { useState } from 'react'
import { CiCamera } from 'react-icons/ci';

const Profile = () => {
     
     const [username ,setUsername]=useState('');
     const [isLoading , setIsLoading]= useState(false)
     const [avatar , setAvatar]=useState(null)
     const [avatarUrl , setAvatarUrl]= useState(null)

  const imgPhoto = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500'

   const handleSubmit = async (e)=>{
      e.preventDefault();

   }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
        <div className='w-1/2 h-full  bg-white mx-auto mt-4 border border-gray-50 rounded-lg shadow'>
            <div className='bg-orange-300 h-70 rounded-lg'>
              <div className='pt-3 flex flex-col items-center '>
                  <img src={imgPhoto} alt="img" className='h-30 w-30 rounded-full object-cover '/>
                  <label htmlFor="InputFile" className='relative -mt-5 ml-20  flex flex-col items-center'>
                    <input type="file"  id="InputFile" 
                      className='hidden'
                    />
                    <CiCamera className='absolute  top-0 right-0 text-4xl text-rose-500 ' />
                  </label>
              </div>  
               <div className=' mt-13 py-4 text-center '>
                   <p className='text-2xl font-bold text-gray-900'>Profile Info</p>
                    <p className='text-xl font-medium  text-gray-800'>username : sakariye</p>
               </div>
            </div>

             <form onSubmit={handleSubmit} className='p-4 ' >
               <input type="text" 
                     className="w-full px-4 py-2 border rounded-md focus:outline-none "
                   placeholder="••••••••"
                    value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input type="email" 
                     className="w-full block my-4 px-4 py-2 border rounded-md focus:outline-none"
                    value={'zakiyareaden@gmail.com'}
                  readOnly
               />
                <div className='flex justify-end'>
                    <button type='submit'
                     className="bg-orange-600 text-white font-bold px-4 py-2 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-amber-500
                           duration-300 transition-colors block w-30 
                         "
                       >
                      Save
                    </button>
                </div>
             </form>
        </div>
    </div>
     
  )
}

export default Profile
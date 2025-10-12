import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { CiCamera } from 'react-icons/ci';

const Profile = () => {
     
     const [username ,setUsername]=useState('');
     const [isLoading , setIsLoading]= useState(false)
     const [avatar , setAvatar]=useState(null)
     const [avatarUrl , setAvatarUrl]= useState(null)

     const InputRef = useRef()

  const imgPhoto = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500'

   const handleChange = (e)=>{
     const file = e.target.files[0]
      // check the file size 
      if(file.size > 2 * 1024 *1024 ){
         toast.error('heey file is too large 2Mb is allowed ') 
         return
      }

      setAvatar(file)
      const preview = URL.createObjectURL(file)
      setAvatarUrl(preview)
   }
   console.log(avatar);

   const handleSubmit = async (e)=>{

     
      e.preventDefault();
        setIsLoading(true)
      try {
        // frist Upload the img then insert 
        const fileEx = avatar.name.split('.').pop()
        // file name 
        const fileName = `${Date.now()}.${fileEx}`
        // path 
        const filePath = `avatars/${fileName}${fileEx}`

        // upload 
        
      } catch (error) {
         console.error('Uploading error:',error);
      }finally{
        setIsLoading(false)
      } 
   }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
        <div className='w-1/2 h-full  bg-white mx-auto mt-4 border border-gray-50 rounded-lg shadow'>
            <div className='bg-orange-300 h-70 rounded-lg'>
              <div className='pt-3 flex flex-col items-center '>
                  <img src={avatarUrl || 'user'} alt="img" className='h-30 w-30 rounded-full object-cover '/>
                  <label htmlFor="InputFile" className='relative -mt-5 ml-20  flex flex-col items-center'>
                    <input type="file"  id="InputFile" 
                       onChange={handleChange}
                      className='hidden'
                      //  value={avatar}
                       ref={InputRef}
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
                         disabled={isLoading}
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
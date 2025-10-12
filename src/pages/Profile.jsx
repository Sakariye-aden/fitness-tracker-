import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { CiCamera } from 'react-icons/ci';
import supabase from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { getUserinfo } from '../lib/Auth';

const Profile = () => {
     
     const [username ,setUsername]=useState('');
     const [isLoading , setIsLoading]= useState(false)
     const [avatar , setAvatar]=useState(null)
     const [avatarUrl , setAvatarUrl]= useState(null)

     const InputRef = useRef()
      const { user  } = useAuth()

      useEffect(()=>{
          const fetch = async ()=>{
              try {
                const {username, avatar_url}= await getUserinfo(user.id)
                 
                if(username){
                  setUsername(username)
                  setAvatarUrl(avatar_url)
                }
                
              } catch (error) {
                 console.error(error);
              }
          }
          fetch()
      },[user])

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


   const handleSubmit = async (e)=>{

     
      e.preventDefault();

       console.log(user);
        setIsLoading(true)
      try {
        // frist Upload the img then insert 
        const fileEx = avatar.name.split('.').pop()
        // file name 
        const fileName = `${Date.now()}.${fileEx}`
        // path 
        const filePath = `avatars/${fileName}${fileEx}`

        // upload img 
        const {error } = await supabase.storage.from('profile')
           .upload(filePath ,avatar)
           if(error){
             console.error("error Upload:",error);
             toast.error("upload error ")
           }

         const { data }  = supabase.storage.from('profile').getPublicUrl(filePath) 
        
          console.log("img url :",data.publicUrl);
          // state img src 
          setAvatarUrl(data.publicUrl)
            const Updates ={
               username,
               avatar_url:data.publicUrl
            }
          // insert the data url in Users table 
          const {date : updateUser , error:UpdateEror}= await supabase
                .from('users')
                 .update(Updates)
                 .eq('id', user.id)
                 

            if(UpdateEror){
              console.error('updated Error:',UpdateEror);
            }
        
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
                    <p className='text-xl font-medium  text-gray-800'>username : {username}</p>
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
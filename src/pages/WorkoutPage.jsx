import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { UploadImage } from '../lib/storage'

const WorkoutPage = () => {
        const [ExerciseName , setIsexerciseName]=useState('')
        const [isSelected , setIsSelected]=useState('')
        const [isRepo , setIsRepo]=useState(0)
        const [duration , setIsDuration]=useState('')
        const [description , setIsDescription]=useState('')
        const [isSaving , setisSaving] = useState(false)
        const [isUploading , setisUploading]=useState(false)
        // img states 
        const [avatar , setAvatar]=useState(null)
        const [avatarUrl , setAvatarUrl]=useState(null)

       const InputRef = useRef()
       const {user } = useAuth()
       
//  onChange Input 
const handleChange = (e)=>{
    const file = e.target.files[0];
   
    if(file){
      // check the file
      // if(!file.name.startswith('img/')){
      //   toast.error("please select image..")
      //   return
      // }

      const maxsize = 2*1024* 1024 
   
      if(file.size > maxsize){
         toast.error('heey your file to large..')
         InputRef.current.value = ""
         return
      }
    }

    setAvatar(file)
}

// upload img 
const handleUpload = async () => {
     
      setisUploading(true)
      try {
     const   {url , path} =  await UploadImage(avatar,user.id)
      setAvatarUrl(url)
       toast.success('image succesfully uploaded.👋')
       //clear
       setAvatar(null)
       if(InputRef.current){
         InputRef.current.value =""
       }
       
      } catch (error) {
         console.error(error)
      }finally{
         setisUploading(false)
      }
}


  const handleSubmit = async (e)=>{
      e.preventDefault()

    
  }



  return (
    <div className='min-h-screen  bg-gray-50 flex justify-center  '>
        <div className='p-4'> 
           <form onSubmit={handleSubmit} className='bg-white md:w-2xl p-4 md:p-8 mt-4 rounded-lg shadow-lg'>
              <div>
                 <h3 className='text-center font-medium text-3xl mb-2 font-mono'>work out Form  </h3>
                 <label htmlFor="name" className='text-lg text-gray-600 font-medium block my-3' > Exercise name
                    <input type="text"  
                     id="name" 
                       className='block w-full border-2 p-1  rounded text-lg border-gray-300 outline-none focus:border-blue-400'
                       value={ExerciseName}
                       onChange={(e)=>setIsexerciseName(e.target.value)}
                    />
                 </label>
              </div>
              <div className='my-3'>
                 <label className='text-lg text-gray-600 font-medium block mb-1' > select image  </label>
                   <input 
                    type="file" 
                      accept="image/*"
                       onChange={handleChange}
                       ref={InputRef}
                       className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"

                      />
                  <button className=" bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none   focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200  disabled:cursor-not-allowed"
                    disabled={isUploading}
                      onClick={ async (params) => {
                           try {
                              await handleUpload()
                           } catch (error) {
                              console.error(error);    
                           }
                        } 
                     }
                    >
                     
                      {isUploading ? 
                       <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-100"></div>
                       : 'upload'}
                   </button>
              </div>
               <div className='my-3'>
                  <label className='text-lg text-gray-600 font-medium block mb-1' >Exercise Type</label>
                   <select   className= 'block w-full border-2 p-1 rounded text-xl border-gray-300 outline-none focus:border-blue-400' 
                     value={isSelected}
                     onChange={(e)=>setIsSelected(e.target.value)}
                   >
                    <option value="">select type </option>
                     <option value="Advanced">Advanced</option>
                     <option value="Intermediate">Intermediate</option>
                     <option value="Beginner">Beginner</option>
                   </select>
                </div> 
                <div className='my-3'>
                   <label className='text-lg text-gray-600 font-medium block mb-1' >Reps</label>
                   <input type="number" min={1} 
                     className='block w-full border-2 p-1 rounded text-xl border-gray-300 outline-none focus:border-blue-400'
                     onChange={(e)=>setIsRepo(e.target.value)}
                      value={isRepo}
                   />
                </div>
                <div className='my-3'>
                   <label className='text-lg text-gray-600 font-medium block mb-1' >Duration</label>
                   <input type="text" 
                     className='block w-full border-2 p-1 rounded text-xl border-gray-300 outline-none focus:border-blue-400'
                      value={duration}
                      onChange={(e)=>setIsDuration(e.target.value)}
                   />
                </div>
                <div className='my-3'>
                   <label className='text-lg text-gray-600 font-medium block mb-1'>Description</label>
                   <textarea   className='block w-full border-2 p-1 rounded text-xl border-gray-300 outline-none focus:border-blue-400'
                      onChange={(e)=>setIsDescription(e.target.value)}
                       value={description}
                    >
                   </textarea>
                </div>
                <div>
                    <button type="submit" className=" bg-amber-400 hover:bg-orange-500 text-white font-bold py-2 px-7 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed "
                     disabled={isSaving}
                    >
                      {
                        isSaving ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-100"></div>
                         : 'Save'
                      }
                    </button>
                </div>
           </form>
        </div>   
    </div>
  )
}

export default WorkoutPage
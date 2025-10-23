import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { UploadImage } from '../lib/storage'
import supabase from '../lib/supabase'
import { Navigate, useNavigate, useParams } from 'react-router'
import { FetchSingleExercise, InsertExercise, UpdateExercises } from '../lib/exercise'

const WorkoutPage = () => {
   
     const { id } = useParams()
     
      const IsEdit = Boolean(id)
      


        const [ExerciseName , setIsexerciseName]=useState('')
        const [isSelected , setIsSelected]=useState('')
        const [isRepo , setIsRepo]=useState(0)
        const [duration , setIsDuration]=useState('')
        const [description , setIsDescription]=useState('')
        const [isSaving , setisSaving] = useState(false)
        const [isUploading , setisUploading]=useState(false)
        const [isloading , setisLoading ]= useState(false)
        // img states 
        const [avatar , setAvatar]=useState(null)
        const [avatarUrl , setAvatarUrl]=useState(null)


        const navigate = useNavigate()

       const InputRef = useRef()
       const {user } = useAuth()

        
      useEffect(()=>{
          
       if(IsEdit){
           FetchExercises()
       }

       
      },[id])
       
//  fetch Exercises 
 const FetchExercises = async()=>{
             
           setisLoading(true)
           try {
             const result = await FetchSingleExercise(id)
              console.log('fetch exer:',result);

              setIsexerciseName(result.exercise_name)
              setIsSelected(result.exercise_type)
              setIsRepo(result.reps)
              setIsDuration(result.duration)
              setIsDescription(result.description)
              setAvatarUrl(result.feature_image)
           } catch (error) {
              console.error(error);
           }finally{
            setisLoading(false)
           }
 } 



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

        
   if (!avatar) {
            toast.error("Please select an image")
            return
        }

        // check if the user is logged in

        if (!user) {
            toast.error('You must be signed in to upload images')
            navigate('/signin')
            return
        }



      try {
          
     const   {url , path} =  await UploadImage(avatar,user.id)
      setAvatarUrl(url)
       toast.success('image succesfully uploaded.👋')
       //clear

    

       setAvatar(null)
       if(InputRef.current){
         InputRef.current.value =""
       }

       return url

      } catch (error) {
         console.error(error)
      }finally{
         setisUploading(false)
      }
}

  
  const handleSubmit = async (e)=>{ 
      e.preventDefault()

      let uploadedImageData = null
        
       if(avatar){
           //  we tell the user to upload img if he forgott upload

         const shouldUpload = confirm('you select image that you dont upload can i upload the image please...')

         if(shouldUpload){
             try {
                    uploadedImageData = await handleUpload()
                    console.log('Image uploaded during save:', uploadedImageData)

                    // Wait a moment for state to update
                    await new Promise(resolve => setTimeout(resolve, 100))
                } catch (error) {
                    console.error('Failed to upload image during save:', error)
                    toast.error('Failed to upload image. Please try uploading the image first.')
                    return
                }
         }else{
               // If user doesn't want to upload the image, ask if they want to proceed without it
                const shouldProceed = confirm('Do you want to proceed without uploading the image?')
                if (!shouldProceed) {
                    return
                }
                // Clear the selected image since user chose not to upload
                setAvatar(null)
                if (InputRef.current) {
                    InputRef.current.value = ''
                }
            }
         }
     
      
      if(!user){
         toast.error('please sign in frist')
         return <Navigate  to="/signin" />
      }
      
   

     setisSaving(true)
      console.log('inserting Exercise ....');

        const currentimageUrl = uploadedImageData || avatarUrl

          console.log('current Url',currentimageUrl);

            console.log('Current image state:', {
                featuredImageUrl: currentimageUrl,
                avatar,
                uploadedImageData
            })

     try {
       
        const ExerciseData = {
            author_id :user.id,
            exercise_name : ExerciseName,
            exercise_type : isSelected,
            reps  : isRepo,
            duration : duration,
            description : description,
            feature_image : currentimageUrl
        }



        if(IsEdit){
           await UpdateExercises(ExerciseData, id)
        }else{
          await InsertExercise(ExerciseData) 
        }
        

     } catch (error) {
       console.log('exercise insert error:',error);
     }finally{
      setisSaving(false)
     }
  }




    if(isloading){
       return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
       )
    }








  return (
    <div className='min-h-screen  bg-gray-50 flex justify-center  '>
        <div className='p-4'> 
           <form onSubmit={handleSubmit} className='bg-white md:w-2xl p-4 md:p-8 mt-4 rounded-lg shadow-lg'>
              <div>
                 <h3 className='text-center font-medium text-3xl mb-2'>work out Form  </h3>
                 <label htmlFor="name" className='text-lg text-gray-600 font-medium block my-3' > Exercise name
                    <input type="text"  
                     required
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
              {IsEdit && (
                <div className=''>
                  <img src={avatarUrl} alt="avatar" className='h-50  rounded-md'/>
                </div>
              )}
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
                    required
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
                         : (
                           IsEdit ? 'Edit' :'save'

                         )
                      }
                    </button>
                </div>
           </form>
        </div>   
    </div>
  )
}

export default WorkoutPage
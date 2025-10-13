import supabase from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid';

export const UploadImage = async (photo, userid)=>{
  
//    file ex 
 const fileExtension = photo.name.split('.').pop()
 const fileName = `${uuidv4()}.${fileExtension}`
 const filePath = `${userid}/${fileName}`

  const {error } = await supabase.storage
           .from('exercise-photo')
           .upload(filePath, photo)

           if(error) throw error

     const {data } = supabase.storage
              .from('exercise-photo')
               .getPublicUrl(filePath)
      
      return {
         url : data.publicUrl,
         path :filePath
      }          
    
}
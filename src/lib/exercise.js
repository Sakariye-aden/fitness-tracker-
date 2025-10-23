import supabase from "./supabase";

export const FetchLatestExercise = async (id, limit=10 , offset=0)=>{
    
     const {data , error }= await supabase
              .from('exercises')
              .select('*')
              .eq('author_id',id)
              .order('created_at', {ascending: true})
              .range(offset, offset + limit - 1 )

           if(error) throw error
           
          const {data:count } = await supabase
                  .from('exercises')
                  .select('count')
                  .eq('author_id',id)

                 console.log('count',count[0].count); 


       return {
          data ,
          count
       }
}


// exercise delete 
export const DeleteExercise = async (id)=>{
   
    const { error }= await supabase
        .from('exercises')
        .delete()
        .eq('id',id)

        if(error) throw error
}

// exercise Update 
export const  UpdateExercises = async (exercise, id)=>{
   
   const Update = {
       author_id :exercise.author_id,
       exercise_name : exercise.exercise_name,
       exercise_type : exercise.exercise_type,
       reps : exercise.reps,
       duration : exercise.duration,
       description : exercise.description,
       feature_image : exercise.feature_image 
   }

  const { data , error } = await supabase
          .from('exercises')
          .update(Update)
          .eq('id',id)

      if(error) throw error
      
   
}

// exercise Insert 
export const InsertExercise = async (exercise)=>{
   

   const {data , error}= await supabase
        .from('exercises')
        .insert(exercise)
        .select()
        .single()

    if(error) throw error

    console.log('insert Data :',data);
}

//fetch exercises 

export const FetchSingleExercise = async (id)=>{

    const { data , error}= await supabase
           .from('exercises')
           .select('*')
           .eq('id',id)
           .single()

      if(error) throw error 
      
      console.log('data',data)

    return data    
}
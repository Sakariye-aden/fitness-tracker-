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
import supabase from '../lib/supabase'

export const signUp = async (email , password , username="")=>{
   
    
        let { data, error } = await supabase.auth.signUp({
         email: email,
         password: password
        })
         
      console.log(data);  
}
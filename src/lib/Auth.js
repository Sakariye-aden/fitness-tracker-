import supabase from '../lib/supabase'

export const signUp = async (email , password , username="")=>{
   
    
        let { data, error } = await supabase.auth.signUp({
         email: email,
         password: password
        })
         
      console.log(data);  

    // we check our session 
     const { data : sessionData } = await supabase.auth.getSession()
      
     if(!sessionData?.session){
         console.log('no session yet');
         return
     }
    
     const displayName = username || data?.user.email.split('@')[0]
    //  we insert the username 
    const {data :profiledata , error : profileError } = await supabase
            .from('users')
            .insert({
                id:data.user.id,
                username:displayName,
                avatar_url :null
            })
   
        if(profileError){
           console.log('profile insert SignUp',error);
        }else{
            console.log('success profile signUp:',profiledata);
        } 
}
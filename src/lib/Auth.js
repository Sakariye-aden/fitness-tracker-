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


export const signIn = async (email ,password)=>{
     
        let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
        })
 
    // we check our session 
     const { data : sessionData } = await supabase.auth.getSession()
      
     if(!sessionData?.session){
         console.log('no session yet');
     }
  
   if(data?.user){
        try {
         await getUserinfo(data.user.id)
     } catch (error) {
        console.log('error happen in sign in', error);
      }
   }
     
}

//reading if its user or not inserting user data
export const getUserinfo = async (userId)=>{
       
      // we check our session 
     const { data : sessionData } = await supabase.auth.getSession()
      
     if(!sessionData?.session){
         console.log('no session yet in getuserInfo.');
     }

     const {data , error } = await supabase
            .from('users')
            .select('*')
             .eq('id',userId)
             .single()

      if(error && error.code === 'PGRST116'){
              
        // we get the current user
           const {data:userData} = await supabase.auth.getUser()
         
           const email = userData?.user.email;
        //    display username 
        const DisplayName = email ? email.split('@')[0] : "User"
        // insert user in our users table 
        const {data : profileData , error:profileError }  = await supabase
              .from('users')
              .insert({
                 id:userId,
                 username:DisplayName,
                 avatar_url:null
              })

          if(profileError){
            console.error('insert Profile Error:',profileError);
          } else{
             console.log('profile insert succesfully :',profileData);
          }

        return profileData
      }   
      
      
      return data

}

export const onAuthStateChange = (callback)=>{
    supabase.auth.onAuthStateChange((event , session)=>{
        // console.log("ssesion",session.user);
        callback(session?.user)
    })
}
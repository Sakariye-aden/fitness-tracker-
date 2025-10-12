import { createContext, useContext, useEffect, useState } from "react";
import { getUserinfo, onAuthStateChange } from "../lib/Auth";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user , setUser] = useState(null)
    const [profile , setProfile] = useState(null)
    const [isLoading , setIsLoading] = useState(true)


    useEffect(()=>{
        onAuthStateChange( async(user)=>{
             setUser(user)

            if(user){

                try {
                    const profileData = await getUserinfo(user.id)
                    setProfile(profileData)
                   setIsLoading(false)  
                } catch (error) {
                   console.log("error occur in Authprovide:",error);  
                   setProfile(null)
                }
            }
        })

    },[])

    const value = {
        user,
        profile ,
        isLoading
    }

    return (

        <AuthContext.Provider  value={value}>
         {children}
       </AuthContext.Provider>
    )

}

// custom Hook 

export const useAuth = ()=>{
    const context = useContext(AuthContext);

    if(context === null){
        console.error("please use useContex:");
      return 
    }

   return context; 
}
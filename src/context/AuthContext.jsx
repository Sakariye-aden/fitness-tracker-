import { createContext, useContext, useEffect, useState } from "react";
import { getUserinfo, onAuthStateChange, UserLogout } from "../lib/Auth";

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


     const Logout = async ()=>{
        await UserLogout()
     }


    const value = {
        user,
        profile ,
        isLoading,
        isLoggedIn :!!user,
        Logout
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
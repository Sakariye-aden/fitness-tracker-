import React, { useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { FaUser } from 'react-icons/fa'
import { Link, useParams } from 'react-router'
import { MdOutlineEdit } from 'react-icons/md'
import ChatUser from '../components/ChatUser'

const ChatPage = () => {

    const [currentUsers , setCurrentUsers]= useState([])
    const [message , setMessage]= useState('')
    const [userData , setUserData] = useState(null) 


   const {user , profile , isLoading} = useAuth()
    
    const {id} = useParams()
     

   useEffect(()=>{
       const fetchUser = async ()=>{
          try {
            
            const {data, error } = await supabase
             .from('users')
             .select('*')
             .neq('id', user.id) 
            
            if(error) throw error
            
            setCurrentUsers(data || [])
            // console.log(data);
          } catch (error) {
            console.error(error);

          }
       }
       fetchUser()
   },[])

    const handleClick = (current)=>{
        setUserData(current)
    }
  useEffect(()=>{
      if(userData){
          console.log('userData:',userData);
      }
  },[userData])

   

    if(isLoading){
       return (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
       )
    }

   


  return (
    <div className='min-h-screen max-w-4xl mx-auto'>
      <div className=' grid grid-cols-3'>
         {/* left side */}
          <div className='bg-gray-100 min-h-screen'>
              <div >
                {/* profile */}
                 <div className='flex justify-between items-center p-2 sm:p-4'>
                    <div className='flex flex-col sm:flex-row sm:space-x-3 sm:items-center'>
                      {
                        profile ? <img src={profile?.avatar_url} alt='profileImage' 
                          className='h-15 w-15 sm:h-20 sm:w-20 rounded-full border-1 border-gray-200  '
                        />
                        :<FaUser className='text-2xl text-rose-500' />
                      }
                      <span className='text-lg text-blue-500 font-medium'>{profile?.username}</span>
                   </div>
                    <Link to={'/profile'}>
                      <MdOutlineEdit className='text-xl text-gray-600' />
                    </Link>
                 </div>
                   <div className='bg-gray-400 p-0.5 rounded-md my2'></div>
                  {/* current users  */}
                  <h2 className='text-xl font-medium '>Current Users</h2>
                  <div className='p-2 sm:p-4 flex flex-col space-y-3'>
                     {
                      currentUsers.map((current)=>(
                        <Link key={current.id} 
                           onClick={()=>handleClick(current)} 
                         >
                           <div className='flex space-x-1 items-center'>
                              <img src={current.avatar_url} alt="userimage" className='h-15 w-15 rounded-full border-1 border-gray-200 '/>
                              
                             <div className='flex justify-between'>
                                   <span className='text-blue-500 text-md font-medium'>{current.username}</span>
                               </div>
                           </div>
                        </Link> 
                      ))
                     }
                  </div> 
              </div>
          </div>
         {/* right side */}
          <div className='col-span-2 '>
              {
                userData && <ChatUser userInfo={userData}/>
              }   
          </div>
      </div>
    </div>
  )
}

export default ChatPage
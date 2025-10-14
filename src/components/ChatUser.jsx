import React from 'react'

const ChatUser = ({userInfo}) => {

   





  return (
    <div className='bg-white '>
       <div className='flex flex-col min-h-screen'>
         {/* Top  */}
           <div className='h-15 flex items-center p-6'>
             {/* profile */}
              <img src={userInfo.avatar_url} alt="profile" className='h-13 w-13 border-1 border-gray-200 rounded-full' />
             <span className='text-lg font-medium text-blue-400 mx-3'>{userInfo.username}</span>
              <span className='block w-3 h-3 mt-0.5 rounded-full bg-green-500'></span> 
           </div>
            <div className='bg-gray-300 h-0.5  rounded-md my-1'></div>

            {/*Messagess text  */}
            <div className=' flex-1'>
                Cool
            </div>

            {/* button */}
            <div className='h-20 bg-gray-100'>
                <form>
                   <input type="text" />
                   <button type='submit'>

                   </button>
                </form>
            </div>
       </div>
    </div>
  )
}

export default ChatUser
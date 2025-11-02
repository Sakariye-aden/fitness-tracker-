import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import supabase from "../lib/supabase";

const ChatUser = ({ userInfo }) => {
  const [message, setMassege] = useState("");
  const [isSaving, setisSaving] = useState(false);
  const [allSMS , setAllSMS] = useState([])

  const { user, profile } = useAuth();

 

  useEffect(() => {
    FetchAll();

    if(!userInfo.id && !user) return  
    
    
      const RealtimeSupabase = async ()=>{
         try {
           const channel = supabase.getChannels();
           console.log('current active channels:',channel.length);

          //  check connection in supabase
          const {data , error}= await supabase
                .from('chat')
                 .select('count')
                 .eq('sender_id',user.id)

                 if(error) throw error

                console.log('the data you sent :',data); 
         } catch (error) {
          console.error(error);
         }
      }
     RealtimeSupabase();

    //  clean up an existing chanels
     supabase.getChannels().forEach((channel)=>{
       console.log('found channel :',channel.topic)
       supabase.removeChannel(channel)
     })
    // create channel 
    const ChatChanel = supabase
      .channel(`chat-${user.id}`) 
       // listen Events 
       .on('postgres_changes',{
          event: 'INSERT',
          schema: 'public',
          table: 'chat'
        },
        (payload) => {
          console.log('📤 Sent message:', payload);
           const newMassage = payload.new

          if (newMassage.receiver_id === user.id) {

          setAllSMS((prev) => [...prev, newMassage]);
          console.log('📥 Received message:', newMassage);
          //  FetchAll()
          }
      
        }
       )  
     .subscribe((status)=>{
         console.log('subscribtion status:',status);
      })

      // cleanUp
      return ()=>{
         console.log('cleanup subscribtion..');
         supabase.removeChannel(ChatChanel)
      }
   
  }, [user, userInfo.id]);

   useEffect(() => {
    console.log('🧾 Updated allSMS:', allSMS);
  }, [allSMS]);

    const FetchAll = async ()=>{
       
     const { data } = await supabase
        .from("chat")
       .select("*")
        .or(`and(sender_id.eq."${user.id}",receiver_id.eq."${userInfo.id}"),and(sender_id.eq."${userInfo.id}",receiver_id.eq."${user.id}")`)
        .order('created_at',{ascending:true})

         console.log(data);
        setAllSMS(data || [])
    }


 

  
// submit Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    setisSaving(true);

    try {
      const { data, error } = await supabase.from("chat").insert({
        sender_id: user.id,
        receiver_id: userInfo.id,
        message: message,
      });
   
      if (error) throw error;

        setAllSMS((prev) => [
            ...prev,
            {
            sender_id: user.id,
            receiver_id: userInfo.id,
            message,
            created_at: new Date().toISOString(),
            },
         ]);

       
    } catch (error) {
      console.error("inser error :", error);
    } finally {
      setisSaving(false);
    }
  };




  return (
    <div className="bg-white border-r-1 border-gray-300">
      <div className="flex flex-col min-h-screen ">
        {/* Top  */}
        <div className="border-b-1 border-gray-500 ">
          <div className="h-15 flex items-center p-6 ">
            {/* profile */}
            <img
              src={userInfo.avatar_url}
              alt="profile"
              className="h-10 w-10 border-1 border-gray-200 rounded-full "
            />
            <span className="text-lg font-medium text-blue-400 mx-3">
              {userInfo.username}
            </span>
            <span className="block w-3 h-3 mt-0.5 rounded-full bg-green-500"></span>
          </div>
          {/* <div className="bg-gray-300 h-0.5  rounded-md my-1"></div> */}
        </div>

        {/*Messagess text  */}
        <div className=" flex-1 p-2">
          {/* messages */}
          <div >
             {
               allSMS.map((item)=>(
                 <div className={`px-2 flex overflow-y-auto ${item.sender_id == user.id ? 'justify-end':'justify-start '}`}>
                   { item.sender_id === user.id ? 
                    (
                     <div className="w-full p-2 flex justify-end  space-x-2  relative ">
                       <p className="p-1 text-white max-w-60 bg-blue-700  rounded-bl-md rounded-tr-md rounded-l-md mr-5">{item.message}</p>
                        <img
                          src={profile.avatar_url}
                          alt="photo"
                          className="h-6 w-6 rounded-full border-1 border-gray-200 absolute bottom-0 right-0 z-10 "
                        />
                     </div>
                    ):
                    (    
                    <div className="w-full p-2 flex my-2 space-x-2  relative">
                       <img
                          src={userInfo.avatar_url}
                          alt="photo"
                          className="h-6 w-6 rounded-full border-1 border-gray-200  absolute bottom-0 left-0 z-10 "
                        />
                       <p className="p-1 text-white max-w-60  bg-blue-400 rounded-br-sm rounded-tl-sm rounded-r-sm ml-6"> {item.message}
                       </p>
                    </div>
                    ) 
                   } 
                 </div>
               ))
             }
          </div>
        </div>

        {/* button */}
        <div className="h-20 bg-gray-100 flex justify-center items-center sticky bottom-0 z-50">
          <form onSubmit={handleSubmit} className="w-full p-2">
            <input
              type="text"
              className="p-2 w-6/7 text-lg bg-white focus:outline-none border-1 rounded-md border-gray-500"
              onChange={(e) => setMassege(e.target.value)}
              value={message}
            />
            <button
              type="submit"
              className="ml-2 border-1 border-gray-400 p-2  rounded-lg"
            >
              {isSaving ? (
                <div className="animate-spin h-5 w-5 border-l-1 border-orange-500 border-r-1 rounded-full"></div>
              ) : (
                <IoSend className="text-xl" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;

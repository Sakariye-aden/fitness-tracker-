import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import supabase from "../lib/supabase";

const ChatUser = ({ userInfo }) => {
  const [message, setMassege] = useState("");
  const [isSaving, setisSaving] = useState(false);
  // const [ReciveMessage, setRecieveMessage] = useState([]);
  // const [SenderMessage, setSenderMessage] = useState([]);
  const [allSMS , setAllSMS] = useState([])

  const { user, profile } = useAuth();

 

  useEffect(() => {
    FetchAll();

    if(!userInfo.id && !user) return  

    //  getTheSenderData()
    // getTheRecieverData()
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

     //clean up an existing chanels
     supabase.getChannels().forEach((channel)=>{
       console.log('found channel :',channel.topic)
       supabase.removeChannel(channel)
     })
    // create channel 
    const ChatChanel = supabase.channel(`chat-${user.id}`) 
      // listen Events 
      .on('postgres_changes',{
         event:"INSERT",
         schema:'public',
         table:'chat'
      },
       payload=>{
         console.log('inser Event:',payload);
         setAllSMS((prev)=>[...prev, payload.new])
      }).subscribe((status)=>{
         console.log('subscribtion status:',status);
      })

      // cleanUp
      return ()=>{
         console.log('cleanup subscribtion..');
         supabase.removeChannel(ChatChanel)
      }
   
  }, [user, userInfo.id]);

 
    const FetchAll = async ()=>{
       
     const { data } = await supabase
        .from("chat")
       .select("*")
        .or(`and(sender_id.eq."${user.id}",receiver_id.eq."${userInfo.id}"),and(sender_id.eq."${userInfo.id}",receiver_id.eq."${user.id}")`)
        .order('created_at',{ascending:true})

         console.log(data);
        setAllSMS(data || [])
    }


  // the message you sent
  // const getTheSenderData = async () => {
  //   const { data } = await supabase
  //     .from("chat")
  //     .select("*")
  //     .or(`and(sender_id.eq."${user.id}",receiver_id.eq."${userInfo.id}")`);

  //   // console.log("the message you sent :", data);
  //   setSenderMessage(data || []);
  // };

  //  the message that receiver send you
  // const getTheRecieverData = async () => {
  //   const { data } = await supabase
  //     .from("chat")
  //     .select("*")
  //     .or(`and(sender_id.eq."${userInfo.id}",receiver_id.eq."${user.id}")`);

  //   // console.log("the message you Recieve  :", data);
  //   setRecieveMessage(data || []);
  // };

  
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

      // setMassege("");
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
        <div className="">
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
          <div className="bg-gray-300 h-0.5  rounded-md my-1"></div>
        </div>

        {/*Messagess text  */}
        <div className=" flex-1 p-2">
          {/* messages */}
          <div className="">
             {
               allSMS.map((item)=>(
                 <div className={`flex ${item.sender_id == user.id ? 'justify-end':'justify-start '}`}>
                   {item.sender_id === user.id &&
                     <div className="w-full p-2 flex justify-end  space-x-2  relative ">
                       <p className="p-1 text-white max-w-60 bg-blue-700  rounded-bl-md rounded-tr-md rounded-l-md mr-5">{item.message}</p>
                        <img
                          src={profile.avatar_url}
                          alt="photo"
                          className="h-6 w-6 rounded-full border-1 border-gray-200 absolute bottom-0 right-0 z-10 "
                        />
                     </div>
                   } 
                   {item.receiver_id === user.id && 
                    <div className="w-full p-2 flex my-2 space-x-2  relative">
                       <img
                          src={userInfo.avatar_url}
                          alt="photo"
                          className="h-6 w-6 rounded-full border-1 border-gray-200  absolute bottom-0 left-0 z-10 "
                        />
                       <p className="p-1 text-white max-w-60  bg-blue-400 rounded-br-sm rounded-tl-sm rounded-r-sm ml-6">{item.message}</p>
                    </div>
                   } 
                 </div>
               ))
             }



            {/* receiver */}
              {/* {ReciveMessage.map((current) => (
                <div key={current.id} className="flex space-x-2  relative my-2  ">
                  <img
                    src={userInfo.avatar_url}
                    alt="photo"
                    className="h-6 w-6 rounded-full border-1 border-gray-200 absolute bottom-0 left-0  z-11 "
                  />
                  <div className="bg-blue-100 p-2 rounded-br-xl rounded-tl-xl rounded-r-xl ml-7">
                    {current.message}
                  </div>
                </div>
              ))}
            
            
                {SenderMessage.map((send) => (
                  <div key={send.id} className="relative flex space-x-7 my-2 ">
                    <div className="flex  justify-end  w-full">
                      <div className="bg-blue-100 p-2  rounded-bl-xl rounded-tr-xl rounded-l-xl ml-7  ">
                        {send.message}
                      </div>
                    </div>
                    <img
                      src={profile.avatar_url}
                      alt="photo"
                      className="h-6 w-6 rounded-full border-1 border-gray-200  "
                    />
                  </div>
                ))} */}
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

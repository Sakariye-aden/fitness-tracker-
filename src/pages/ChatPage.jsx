import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { MdOutlineEdit } from "react-icons/md";
import ChatUser from "../components/ChatUser";
import { FiArrowLeft } from "react-icons/fi";
import { IoChatboxEllipses } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatPage = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [isLoading , setIsloading] = useState(false)

  const { user, profile } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
       setIsloading(true)
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .neq("id", user.id);

        if (error) throw error;

        setCurrentUsers(data || []);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }finally{
        setIsloading(false)
      }
    };
    fetchUser();
  }, []);

  const handleClick = (current) => {
    setUserData(current);
    setisOpen(true)
  };
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }



  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <div className="hidden  sm:grid sm:grid-cols-3">
        {/* left side */}
        <div className="bg-slate-800  min-h-screen">
          <div>
            {/* profile */}
            <div className="flex justify-between items-center p-2 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center">
                {profile ? (
                  <img
                    src={profile?.avatar_url}
                    alt="profileImage"
                    className="h-12 w-12 sm:h-20 sm:w-20 rounded-full border-1 border-gray-200  "
                  />
                ) : (
                  <FaUser className="text-2xl text-white" />
                )}
                <span className="text-lg text-white font-medium">
                  {profile?.username}
                </span>
              </div>
              <Link to={"/profile"}>
                <MdOutlineEdit className="text-xl text-white" />
              </Link>
            </div>
            <div className="bg-gray-400 p-0.5 rounded-md my2"></div>
            {/* current users  */}
            <h2 className="text-xl font-medium ">Current Users</h2>
            <div className="p-2 sm:p-4 flex flex-col space-y-3">
              {currentUsers.map((current) => (
                <div key={current.id} onClick={() => handleClick(current)}>
                  <div className="flex space-x-1 items-center cursor-pointer">
                    <img
                      src={current.avatar_url}
                      alt="userimage"
                      className="h-15 w-15 rounded-full border-1 border-gray-200 "
                    />

                    <div className="flex justify-between">
                      <span className="text-white text-md font-medium">
                        {current.username}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="col-span-2 ">
          {userData && <ChatUser userInfo={userData} />}
        </div>
      </div>
      {/* mobile design  */}
      <div className="sm:hidden bg-slate-900 min-h-screen">
        {isOpen ? (
           <div className="relative"> 
             <FiArrowLeft className="text-md absolute top-6 left-0 z-20 cursor-pointer" 
               onClick={()=> setisOpen(false)}
             />
             <ChatUser userInfo={userData}/>
           </div>         
        ) : (
          <div className="p-6 ">
             <div className="py-4 flex justify-between items-center">
               <div className="flex items-center space-x-2 text-white ">
                 <IoChatboxEllipses  className="text-4xl"/>
                 <span className="font-medium text-xl  pb-2">Chatapp</span>
               </div>
               <BsThreeDotsVertical className="text-white text-xl" />
             </div>
            <div className="p-2 sm:p-4 flex flex-col space-y-6 mt-2">
              {currentUsers.map((current) => (
                <div key={current.id} onClick={() => handleClick(current)}>
                  <div className="flex space-x-3 items-center cursor-pointer">
                    <img
                      src={current.avatar_url}
                      alt="userimage"
                      className="h-12 w-12 rounded-full border-1 border-gray-200 "
                    />

                    <div className="flex justify-between">
                      <span className="text-white text-md font-medium">
                        {current.username}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

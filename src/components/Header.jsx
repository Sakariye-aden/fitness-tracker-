import React, { useState } from "react";
import { Link } from "react-router";
import { CiMenuBurger } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { FaChevronRight, FaUser } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrobDown, setIsDrobDown] = useState(false);
  const { user , profile ,isLoggedIn , Logout } =useAuth()

  

  

  return (
    <header className="bg-white shadow sticky top-0 z-100">
      <div className="max-w-5xl mx-auto p-4  ">
        <div className="flex justify-between ">
          {/* left  */}
          <div className="flex ">
            <Link to={"/"} className="mx-6 md:mx-0 flex items-center">
              <span className="text-2xl text-orange-600 font-bold">Alpha</span>
            </Link>
            <nav className="hidden sm:ml-7 sm:flex sm:items-center sm:justify-center p-1 sm:space-x-5 ">
              <Link
                to="/"
                className="text-lg font-medium text-gray-800  border-b-2  border-amber-700 "
              >
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/workout"
                    className="text-lg font-medium text-gray-800  border-b-2    border-transparent "
                  >
                    Workout
                  </Link>
                  <Link
                    to="/progress"
                    className="text-lg font-medium text-gray-800  border-b-2  border-transparent "
                  >
                    Progress
                  </Link>
                  <Link
                    to="/chat"
                    className="text-lg font-medium text-gray-800  border-b-2  border-transparent"
                  >
                    chat
                  </Link>
                  <Link
                    to="/manage"
                    className="text-lg font-medium text-gray-800  border-b-2  border-transparent"
                  >
                    manage
                  </Link>
                </>
              )}
            </nav>
          </div>
          {/* right  */}
          <div className="flex ">
            {isLoggedIn ? (
              //  profile
              <div className="flex items-center space-x-3 ">
                <span className="font-medium text-gray-600">Hello {profile?.username}</span>
                {/* profile  */}
                <div
                  className="relative"
                  onClick={() => setIsDrobDown(!isDrobDown)}
                >
                 {
                   profile ? <img
                    src={profile.avatar_url}
                    alt="avatat"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  : <FaUser className="w-7 h-7 rounded-full text-rose-400" />
                 } 

                  {isDrobDown && (
                    <div
                      className="absolute right-0 top-10 w-30 z-50 shadow-md rounded-md  bg-white p-2"
                      onMouseLeave={() => setIsDrobDown(!isDrobDown)}
                    >
                      <Link to="/profile" className="block font-medium text-gray-600">
                        Profile
                      </Link>
                      <Link to='manage' className="block font-medium text-gray-600">
                        Manage
                      </Link>
                      <button className="block font-medium text-gray-600 cursor-pointer"
                         onClick={()=> Logout()}
                        >
                        Signout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // sign Buttons
              <div className="hidden sm:flex sm:space-x-2 mx-6">
                <Link
                  to="/signin"
                  className="bg-orange-600 text-white font-bold px-4 py-2 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-amber-500
                           duration-300 transition-colors
                         "
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border-1 border-gray-400 font-bold px-4 py-2 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-amber-400 hover:text-white focus:border-0 
                           duration-300 transition-all
                         "
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
            
            {/* Menu */}
            <div className="sm:hidden flex items-center mr-6" >
              {isMenuOpen ? (
                <MdClose className="text-2xl font-medium" 
                   onClick={()=>setIsMenuOpen(!isMenuOpen)}
                />
              ) : (
                <CiMenuBurger className="text-2xl font-medium"
                   onClick={()=>setIsMenuOpen(!isMenuOpen)}
                />
              )}
            </div>
        </div>
      </div>
      {/* mobile  */}
       {
        isMenuOpen &&
         (
           <div className="sm:hidden absolute top-16 h-56 w-full bg-white" 
              onClick={()=>setIsMenuOpen(false)}
           >
          
              {/* navigation */}
              <Link
                to="/"
                className="text-lg font-medium block py-2 px-4  bg-orange-50  text-gray-800  border-l-2  border-amber-700 "
              >
                Home
              </Link>
              {
                isLoggedIn ?
                (
                    <>
                        <Link
                          to="/workout"
                          className="text-lg font-medium text-gray-800 block py-2 px-4  hover:bg-orange-50 border-b-1 border-gray-200  "
                        >
                          Workout
                        </Link>
                        <Link
                          to="/progress"
                          className="text-lg font-medium text-gray-800  block py-2 px-4  hover:bg-orange-50  border-b-1 border-gray-200  "
                        >
                          Progress
                        </Link>
                        <Link
                          to="/chat"
                          className="text-lg font-medium text-gray-800   block py-2 px-4  hover:bg-orange-50  border-b-1 border-gray-200 "
                        >
                          chat
                        </Link>
                        <Link
                          to="/manage"
                          className="text-lg font-medium text-gray-800   block py-2 px-4  hover:bg-orange-50  border-b-1 border-gray-200 "
                        >
                          manage
                        </Link>
                        <button  className="text-lg font-medium text-gray-800   block w-full py-2 px-4  hover:bg-orange-50  border-b-1 border-gray-200  text-left "
                             onClick={()=> Logout()}
                        >
                          Signout
                        </button>
                      </>
                )
                :
                (
                  <>
                    <Link
                        to="/signin"
                        className="bg-orange-500 block w-full text-white font-bold  py-3 text-center
                                focus:outline-none  hover:bg-amber-500
                                duration-300 transition-colors
                              "
                      >
                        SignIn
                      </Link>
                      <Link
                        to="/signup"
                        className="bg-transparent block w-full border-1 border-gray-400 font-bold py-3
                                focus:outline-none  text-center focus:border-none 
                                duration-300 transition-all
                              "
                      >
                        SignUp
                      </Link>
                  </>    
                )
              }
            </div>
         )
       }
      
    </header>
  );
};

export default Header;

import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Profile from "./pages/Profile"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"
import UnAuthenticated from "./components/UnAuthenticated"


function App() {
 

  return (
    <AuthProvider>
    <div>
       {/* header */}
       <Header />
        <main >
          {/* routes */}
          <Routes>
             {/* public route */}
             <Route path="/" element={<HomePage />} />
             {/* Unauthorized Route */}
             <Route path="/signin" 
              element={ 
                <UnAuthenticated>
                   <SignInPage />
                </UnAuthenticated>       
              } 
             />
             <Route path="/signup"  
             element={
               <UnAuthenticated>
                  <SignUpPage/>
               </UnAuthenticated>
               }     
             />

              <Route path="/profile" element={<Profile/> }/>
          </Routes>
        </main>
       {/* Footer */}
        <Footer />
        <Toaster />
    </div>
    </AuthProvider>
  )
}

export default App

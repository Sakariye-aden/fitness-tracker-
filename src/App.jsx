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
import ProtectedRoute from "./components/ProtectedRoute"
import WorkoutPage from "./pages/WorkoutPage"
import ProgressPage from "./pages/ProgressPage"
import ChatPage from "./pages/ChatPage"
import ManagePage from "./pages/ManagePage"


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
             {/* Protected Route  */}
              <Route path="/profile"
               element={
                 <ProtectedRoute>
                      <Profile/> 
                 </ProtectedRoute>
                }      
               />
               <Route path="/workout" 
               element={
                 <ProtectedRoute>
                   <WorkoutPage />
                 </ProtectedRoute>
                 } 
               />
               <Route path="/progress" 
               element={
                 <ProtectedRoute>
                   <ProgressPage />
                 </ProtectedRoute>
                 } 
               />
               <Route path="/chat" 
               element={
                 <ProtectedRoute>
                   <ChatPage />
                 </ProtectedRoute>
                 } 
               />
               <Route path="/manage" 
               element={
                 <ProtectedRoute>
                   <ManagePage />
                 </ProtectedRoute>
                 } 
               />
               
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

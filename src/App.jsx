import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Header from "./components/Header"
import Footer from "./components/Footer"


function App() {
 

  return (
    <div>
       {/* header */}
       <Header />
        <main >
          {/* routes */}
          <Routes>
             {/* public route */}
             <Route path="/" element={<HomePage />} />
             {/* Unauthorized Route */}
             <Route path="/signin" element={<SignInPage />} />
             <Route path="/signup"  element={<SignUpPage/>} />
          </Routes>
        </main>
       {/* Footer */}
        <Footer />
    </div>
  )
}

export default App

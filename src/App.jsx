import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"


function App() {
 

  return (
    <div>
       {/* header */}
        <main>
          {/* routes */}
          <Routes>
             {/* public route */}
             <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
       {/* Footer */}
    </div>
  )
}

export default App

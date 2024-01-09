import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './Router'
import Navbar from './components/navbar/Navbar'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AllRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App

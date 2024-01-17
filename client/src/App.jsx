import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './Router'
import Navbar from './components/navbar/Navbar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllQuestion } from './redux/slices/questionSlice'
import { fetchAllUsers } from './redux/slices/authSlice'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestion())
    dispatch(fetchAllUsers())
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <AllRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App

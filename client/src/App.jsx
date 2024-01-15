import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './Router'
import Navbar from './components/navbar/Navbar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllQuestion } from './redux/slices/questionSlice'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestion())
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

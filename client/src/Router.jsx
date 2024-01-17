import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Questions from './pages/questions/Questions'
import AskQuestion from './pages/askQuestion/AskQuestion'
import DisplayQuestion from './pages/questions/DisplayQuestion'
import Tags from './pages/tags/Tags'
import Users from './pages/users/Users'
import UserProfile from './pages/userProfile/UserProfile'
function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/Questions' element={<Questions />} />
      <Route path='/AskQuestion' element={<AskQuestion />} />
      <Route path='/Questions/:id' element={<DisplayQuestion />} />
      <Route path='/Tags' element={<Tags />} />
      <Route path='/Users' element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
    </Routes>
  )
}

export default AllRoutes
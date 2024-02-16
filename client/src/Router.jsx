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
import ChatBotPage from './pages/chatbot/ChatbotPage'
import SubscriptionPlans from './pages/subscriptionPlan/SubscriptionPlan'
import SubscriptionConfirmation from './components/subscriptionConfirmation/SubscriptionConfirmation'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionFailed from './components/subscriptionConfirmation/SubscriptionFailed'
import RequireUser from './components/RequireUser'
import RequireBot from './components/RequireBot'
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function AllRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route element={<RequireUser />}>
        <Route path='/Questions' element={<Questions />} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Questions/:id' element={<DisplayQuestion />} />
        <Route path='/Tags' element={<Tags />} />
        <Route path='/Users' element={<Users />} />
        <Route path="/Users/:id" element={<UserProfile />} />
        <Route element={<RequireBot />}>
          <Route path="/chatbot" element={<ChatBotPage />} />
        </Route>

        <Route path="/subscribe" element={<Elements stripe={stripePromise}><SubscriptionPlans /></Elements>} />
        <Route path="/subscription-successs/:id" element={<SubscriptionConfirmation />} />
        <Route path="/subscription-failed" element={<SubscriptionFailed />} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './Router';
import Navbar from './components/navbar/Navbar';
import Weather from './components/weather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestion } from './redux/slices/questionSlice';
import { fetchAllUsers } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestion());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDarkMode = () => {
    document.body.classList.toggle('cloudy');
  };
  const User = useSelector(state => state.authReducer.auth)
  return (
    <div className='App'>
      <BrowserRouter>
        <Weather>
          <Navbar onClick={handleDarkMode} />
          <AllRoutes />
        </Weather>
      </BrowserRouter>
    </div>
  );
}

export default App;

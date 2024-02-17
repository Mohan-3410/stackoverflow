import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
// import logo from '../../assets/logo.png'
import icon from "../../assets/icon.png"
import search from '../../assets/search-solid.svg'
import Avatar from '../avatar/Avatar'
import { jwtDecode } from "jwt-decode"
import { useDispatch, useSelector } from 'react-redux'
import { login, setCurrentUser } from '../../redux/slices/authSlice'
import { MdOutlineMenu } from "react-icons/md";
import MobileSideView from '../leftSideBar/MobileSideBar'

function Navbar({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector(state => state.authReducer.currentUser)
  const currentUser = JSON.parse(localStorage.getItem('Profile'));
  const [openSideview, setOpenSideView] = useState(false)

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
    dispatch(setCurrentUser(null))
  }
  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(currentUser))
  }, [dispatch]);
  function handleClick() {
    onClick()
  }

  return (
    <nav className="main-nav">
      {openSideview && <div style={{ position: "absolute", top: 0, right: 0, transition: "all ease 300ms" }}>
        <MobileSideView onClose={setOpenSideView} />
      </div>}
      <div className="navbar">
        <div className="navbar-1">
          <div className="menubar" onClick={() => setOpenSideView(true)}><MdOutlineMenu /></div>
          <Link to='/' className='nav-item nav-logo'>
            <img src={icon} alt="logo" width='40' height='40' />
            <p>stack<b>overflow</b></p>
          </Link>
          <Link to='/' className='nav-item nav-btn res-nav' onClick={handleClick}>About</Link>
          <Link to='/' className='nav-item nav-btn res-nav'>Products</Link>
          <Link to='/' className='nav-item nav-btn res-nav'>For Teams</Link>
          <form>
            <input type="text" placeholder='Search...' />
            <img src={search} alt="search" width="18" className='search-icon' />
          </form>
        </div>
        <div className="navbar-2">
          {
            User === null ?
              <Link to='/auth' className='nav-item nav-links'>Log in</Link> :
              <>
                <Avatar
                  backgroundColor="var(--accent)"
                  px="10px"
                  py="7px"
                  borderRadius="50%"
                  color="var(--secondary)"
                >
                  <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {User.result.name.charAt(0).toUpperCase()}
                  </Link>
                </Avatar>
                <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
              </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
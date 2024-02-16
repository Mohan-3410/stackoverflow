import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import globe from '../../assets/Globe.svg'
import "./LeftSideBar.css"
import OtpModal from '../modal/OtpModal';
import { useSelector } from 'react-redux';


function LeftSideBar() {
  const dialog = useRef();
  const navigate = useNavigate();
  const User = useSelector(state => state.authReducer.currentUser)

  const handleChatBot = async () => {
    const userId = localStorage.getItem('botuser')
    if (userId === User.result._id) {

      navigate('/chatbot')
    }
    else {
      dialog.current.showModal();
    }
  }

  return (
    <>
      <OtpModal ref={dialog} />
      <div className="left-sidebar">
        <div className="side-nav">
          <NavLink to="/" className="side-nav-links" activeclassname="active">
            <p>Home</p>
          </NavLink>
          <div className="side-nav-div">
            <div>
              <p>PUBLIC</p>
            </div>
            <NavLink to="/Questions" className="side-nav-links" activeclassname="active">
              <img src={globe} alt="Globe" />
              <p style={{ paddingLeft: '10px' }}>Questions</p>
            </NavLink>
            <NavLink to="/Tags" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active">
              <p>Tags</p>
            </NavLink>
            <NavLink to="/Users" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active">
              <p>Users</p>
            </NavLink>
            <NavLink to="/subscribe" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active">
              <p>Subscribe</p>
            </NavLink>
          </div>
        </div>
        <button className='askAi' onClick={handleChatBot}>Ask AI</button>
      </div>
    </>
  )
}

export default LeftSideBar
import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import globe from '../../assets/Globe.svg'
import "./LeftSideBar.css"
import OtpModal from '../modal/OtpModal';
import { useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";

function MobileSideView({ onClose }) {
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
    const handleClose = () => {
        onClose(false)
    }

    return (
        <>
            <OtpModal ref={dialog} />
            <div className="left-sidebar" style={{ backgroundColor: "var(--secondary)" }}>
                <div className="side-nav">
                    <div className='closesidebar' onClick={handleClose}>
                        <IoMdClose />
                    </div>
                    <NavLink to="/" className="side-nav-links" activeclassname="active" onClick={handleClose}>
                        <p>Home</p>
                    </NavLink>
                    <div className="side-nav-div">
                        <div>
                            <p>PUBLIC</p>
                        </div>
                        <NavLink to="/Questions" className="side-nav-links" activeclassname="active" onClick={handleClose}>
                            <img src={globe} alt="Globe" />
                            <p style={{ paddingLeft: '10px' }}>Questions</p>
                        </NavLink>
                        <NavLink to="/Tags" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active" onClick={handleClose}>
                            <p>Tags</p>
                        </NavLink>
                        <NavLink to="/Users" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active" onClick={handleClose}>
                            <p>Users</p>
                        </NavLink>
                        <NavLink to="/subscribe" className="side-nav-links" style={{ paddingLeft: "40px" }} activeclassname="active" onClick={handleClose}>
                            <p>Subscribe</p>
                        </NavLink>
                    </div>
                </div>
                <button className='askAi' onClick={handleChatBot}>Ask AI</button>
            </div>
        </>
    )
}

export default MobileSideView;
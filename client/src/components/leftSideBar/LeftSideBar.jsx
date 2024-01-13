import React from 'react'
import { NavLink } from 'react-router-dom'
import globe from '../../assets/Globe.svg'
import "./LeftSideBar.css"


function LeftSideBar() {
  return (
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
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
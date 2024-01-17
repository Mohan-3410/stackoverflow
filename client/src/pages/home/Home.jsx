import React from 'react'
import "../../App.css"
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'
import HomeMainbar from '../../components/homeMainbar/HomeMainbar'

function Home({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
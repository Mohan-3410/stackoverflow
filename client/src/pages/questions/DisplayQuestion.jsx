import React from 'react'
import "../../App.css"
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import RightSideBar from '../../components/rightSideBar/RightSideBar'
import QuestionsDetails from './QuestionsDetails'


function Home({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <QuestionsDetails />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
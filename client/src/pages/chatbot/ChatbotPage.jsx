import React from 'react'
import "../../App.css"
import LeftSideBar from '../../components/leftSideBar/LeftSideBar'
import ChatBot from "./ChatBots"

function ChatBotPage({ slideIn }) {
  return (
    <div className="home-container-1">
      <LeftSideBar slideIn={slideIn} />
      <div className="home-container-2">
        <ChatBot />
      </div>
    </div>
  )
}

export default ChatBotPage
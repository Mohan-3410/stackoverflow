import React from 'react'
import "./HomeMainbar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

function HomeMainbar() {

  const { questionList } = useSelector(state => state.questionReducer)

  const navigate = useNavigate();
  const User = useSelector(state => state.authReducer.currentUser);
  const location = useLocation();
  const checkAuth = () => {
    if (User === null) {
      alert("login or signup to ask a question...");
      navigate("/auth");
    }
    else {
      navigate("/AskQuestion");
    }
  }
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? <h1>Top Questions</h1> : <h1>All Question</h1>}
        <button className='ask-btn' onClick={checkAuth}>Ask Question</button>
      </div>
      <div>
        {questionList === null ? <h1>Loading...</h1> : <>
          <p>{questionList?.length} questions</p>
          <QuestionList questionList={questionList} />
        </>}
      </div>
    </div>
  )
}

export default HomeMainbar
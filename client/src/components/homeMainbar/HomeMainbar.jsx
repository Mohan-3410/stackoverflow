import React from 'react'
import "./HomeMainbar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';

function HomeMainbar() {
  var questionList = [
    {
      _id: 1,
      upVotes: 1,
      downVotes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["jave", "node js", "react js", "mongoose"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [{
        answerBody: "Answer",
        userAnswered: 'kumar',
        answeredOn: "jan 2",
        userId: 2
      }]
    },
    {
      _id: 2,
      upVotes: 1,
      downVotes: 3,
      noOfAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["jave", "node js", "react js", "mongoose"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [{
        answerBody: "Answer",
        userAnswered: 'kumar',
        answeredOn: "jan 2",
        userId: 2
      }]
    },
    {
      _id: 3,
      upVotes: 1,
      downVotes: 3,
      noOfAnswers: 0,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["jave", "node js", "react js", "mongoose"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [{
        answerBody: "Answer",
        userAnswered: 'kumar',
        answeredOn: "jan 2",
        userId: 2
      }]
    },
  ];

  const navigate = useNavigate();
  const user = 1;
  const location = useLocation();
  const checkAuth = () => {
    if (user === null) {
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
          <p>{questionList.length} questions</p>
          <QuestionList questionList={questionList} />
        </>}
      </div>
    </div>
  )
}

export default HomeMainbar
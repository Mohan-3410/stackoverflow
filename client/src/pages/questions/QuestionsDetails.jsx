import React from 'react'

function QuestionsDetails() {
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

  return (
    <div className='question-details-page'>
      <h1></h1>
    </div>
  )
}

export default QuestionsDetails
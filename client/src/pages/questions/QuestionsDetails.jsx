import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import copy from "copy-to-clipboard"

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css"
import Avatar from '../../components/avatar/Avatar';
import DisplayAnswers from './DisplayAnswers';
import { deleteQuestion, postAnswer, voteQuestion } from '../../redux/slices/questionSlice';

function QuestionsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { questionList } = useSelector(state => state.questionReducer)
  const User = useSelector(state => state.authReducer.currentUser)
  const [ans, setAns] = useState("");
  const url = import.meta.env.MODE === "development" ? "http://localhost:5173" : import.meta.env.VITE_CLIENT_BASE_URL;
  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate('/auth')
    }
    else {
      if (ans === "") {
        alert("Enter an answer before submitting");
      }
      else {
        dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: ans, userAnswered: User.result.name, userId: User.result._id }))
      }
    }
    setAns("")
  }
  const handleShare = () => {
    copy(url + location.pathname)
    alert("Copied url : " + url + location.pathname)
  }
  const handleDelete = () => {
    dispatch(deleteQuestion({ id, navigate }))
  }
  const handleUpVotes = () => {
    dispatch(voteQuestion({ id, value: 'upvote', userId: User.result._id }))
  }
  const handleDownVotes = () => {
    dispatch(voteQuestion({ id, value: 'downvote', userId: User.result._id }))
  }

  return (
    <div className='question-details-page'>
      {
        questionList === null ? <h1>Loading...</h1> : <>
          {
            questionList?.filter(question => question._id === id).map(question => {
              return <div key={question._id}>
                <section className='question-details-container'>
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img src={upvote} alt="upvote" width="18" className='votes-icon' onClick={handleUpVotes} />
                      <p>{question.upVotes.length - question.downVotes.length}</p>
                      <img src={downvote} alt="downvote" width="18" className='votes-icon' onClick={handleDownVotes} />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className='question-details-tags'>
                        {
                          question.questionTags.map(tag => <p key={tag}>{tag}</p>)
                        }
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type='button' onClick={handleShare}>Share</button>
                          {User?.result._id === question.userId &&
                            <button type='button' onClick={handleDelete}>Delete</button>
                          }
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                            <Avatar backgroundColor="orange" px='8px' py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                            <div>
                              {question.userPosted}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {
                  question.noOfAnswers !== 0 && (
                    <section>
                      <h3>{question.noOfAnswers} Answers</h3>
                      <DisplayAnswers key={question._id} question={question} handleShare={handleShare} />
                    </section>
                  )
                }

                <section className='post-ans-container'>
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => handlePostAns(e, question.answer.length)}>
                    <textarea value={ans} name="" id="" cols="30" rows="10" onChange={e => setAns(e.target.value)} />
                    <input type="submit" className='post-ans-btn' value="Post Your Answer" />
                  </form>
                  <p>
                    Browse other Question tagged
                    {
                      question.questionTags.map(tag => <Link to="/Tags" key={tag} className='ans-tags'>{tag}</Link>)
                    } or
                    <Link to='/AskQuestion' style={{ textDecoration: "none", color: "#009dff" }}> ask your own question.</Link>
                  </p>
                </section>
              </div>
            })
          }
        </>
      }
    </div>
  )
}

export default QuestionsDetails
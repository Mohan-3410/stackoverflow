import React, { useState } from "react";
import "./AskQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { askQuestion } from "../../redux/slices/questionSlice";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";

function AskQuestion() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector(state => state.authReducer.currentUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosClient.get("/auth/update-user");
    if (response.data.subscription.plan === "free" && response.data.subscription.questionsPostedToday === 1) {
      alert("Your free limit is exceed please subscribe");
      navigate('/subscribe')
    }
    else if (response.data.subscription.plan === "silver" && response.data.subscription.questionsPostedToday === 5) {
      alert("Your silver plan limit is exceede please come again tomorrow");
    }
    else {
      dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User.result._id, navigate }))
    }
  }

  return (
    <div className="ask-question">

      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={e => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={e => setQuestionBody(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     setQuestionBody((prevValue) => prevValue + '\n');
              //   }
              // }}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={e => setQuestionTags(e.target.value.split(' '))}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;

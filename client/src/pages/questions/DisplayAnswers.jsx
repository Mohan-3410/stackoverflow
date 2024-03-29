import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../redux/slices/questionSlice';

function DisplayAnswers({ question, handleShare }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const User = useSelector(state => state.authReducer.currentUser)
    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer({ id, answerId, noOfAnswers: noOfAnswers - 1 }))
    }
    return (
        <div>
            {
                question.answer.map((ans) => {
                    return <div className="display-ans" key={ans.answeredOn}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type='button' onClick={handleShare}>Share</button>
                                {User?.result._id === ans.userId && <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>}
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                                    <Avatar backgroundColor="green" px='8px' py="5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default DisplayAnswers
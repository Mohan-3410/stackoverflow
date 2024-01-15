import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'

function DisplayAnswers({ question }) {
    console.log({ question })
    return (
        <div>
            {
                question.answer.map((ans) => {
                    return <div className="display-ans" key={ans.answeredOn}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type='button'>Share</button>
                                <button type='button'>Delete</button>
                            </div>
                            <div>
                                <p>answered {ans.answeredOn}</p>
                                <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: "#0086d8" }}>
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
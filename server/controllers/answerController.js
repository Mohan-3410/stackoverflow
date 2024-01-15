const mongoose = require('mongoose');
const Questions = require('../models/Questions');

const postAnswerController = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    console.log({ _id, noOfAnswers, answerBody, userAnswered })
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable');
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId: req.userId }] } })
        return res.status(200).json(updatedQuestion);
    } catch (e) {
        return res.status(404).json(e);
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        const data = await Questions.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
        return data;
    } catch (e) {
        console.error(e.message);
    }
}
module.exports = { postAnswerController }
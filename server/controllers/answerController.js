const mongoose = require('mongoose');
const Questions = require('../models/Questions');

const postAnswerController = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable');
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
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

const deleteAnswerController = async (req, res) => {

    try {
        const { id: _id } = req.params;
        const { answerId, noOfAnswers } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Question unavailable');
        }
        if (!mongoose.Types.ObjectId.isValid(answerId)) {
            return res.status(404).send('Answer unavailable');
        }
        updateNoOfQuestions(_id, noOfAnswers);
        await Questions.updateOne({ _id }, { $pull: { 'answer': { _id: answerId } } })
        res.status(200).json({ message: "Answer successfully deleted" })
    } catch (e) {
        return res.status(404).json(e.message);
    }
}

module.exports = { deleteAnswerController, postAnswerController }
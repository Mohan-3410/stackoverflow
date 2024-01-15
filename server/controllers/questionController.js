const Questions = require("../models/Questions")

const askQuestionController = async (req, res) => {
    try {
        const postQuestionData = req.body;
        const postQuestion = new Questions({ ...postQuestionData, userId: req.userId })
        await postQuestion.save()
        return res.status(200).json("posted a question successfully")
    }
    catch (e) {
        console.log(e);
        return res.status(409).json("couldn't post a new question")
    }
}

const getAllQuestionController = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList)
    } catch (e) {
        return res.status(404).json({ message: error.message });
    }
}
module.exports = { getAllQuestionController, askQuestionController }
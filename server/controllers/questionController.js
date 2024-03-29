const Questions = require("../models/Questions")
const mongoose = require("mongoose");
const User = require("../models/User");

const askQuestionController = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (user.subscription.plan !== 'free' && (!user.subscription.subscriptionEnd || user.subscription.subscriptionEnd < new Date())) {
            return res.status(403).json({ message: `Subscription expired. Please renew your ${user.subscription.plan} plan.` });
        }

        const { plan, questionsPostedToday } = user.subscription;
        const maxQuestionsPerDay = plan === 'free' ? 1 : plan === 'silver' ? 5 : Infinity;

        if (questionsPostedToday >= maxQuestionsPerDay) {
            return res.status(403).json({ message: `Daily limit reached for ${plan} plan` });
        }

        const postQuestionData = req.body;
        const postQuestion = new Questions(postQuestionData);
        await postQuestion.save();

        user.subscription.questionsPostedToday += 1;
        await user.save();

        return res.status(200).json({ message: "Posted a question successfully" });
    }
    catch (e) {
        return res.status(409).json({ message: "Couldn't post a new question" });
    }
}


const getAllQuestionController = async (req, res) => {
    try {
        const questionList = await Questions.find();
        return res.status(200).json(questionList)
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
}

const deleteQuestionController = async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Question unavailable');
        }
        await Questions.findByIdAndDelete(_id);
        return res.status(200).json({ messsge: 'Question deleted successfully' });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }
}

const voteQuestionController = async (req, res) => {

    try {
        const { id: _id } = req.params;
        const { value, userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Question unavailable');
        }
        const question = await Questions.findById(_id);
        const upIndex = question.upVotes.findIndex(id => id === String(userId))
        const downIndex = question.downVotes.findIndex(id => id === String(userId));

        if (value === 'upvote') {
            if (downIndex !== -1) {
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                question.upVotes.push(userId);
            } else {
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
        }
        if (value === 'downvote') {
            if (upIndex !== -1) {
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.downVotes.push(userId);
            } else {
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        return res.status(200).json({ message: 'voted successfully' });
    } catch (e) {
        return res.status(404).json({ message: e.message });
    }

}
module.exports = { voteQuestionController, deleteQuestionController, getAllQuestionController, askQuestionController }
const router = require('express').Router();
const { subscribeController } = require('../controllers/featuresController');
const { voteQuestionController, deleteQuestionController, getAllQuestionController, askQuestionController } = require('../controllers/questionController');
const { auth } = require('../middlewares/auth')

router.post('/Ask', auth, askQuestionController)
router.get('/get', getAllQuestionController)
router.delete('/delete/:id', auth, deleteQuestionController)
router.patch('/vote/:id', auth, voteQuestionController)
router.post('/subscribe', auth, subscribeController)

module.exports = router;
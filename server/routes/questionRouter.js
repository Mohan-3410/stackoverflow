const router = require('express').Router();
const { voteQuestionController, deleteQuestionController, getAllQuestionController, askQuestionController } = require('../controllers/questionController');
const { auth } = require('../middlewares/auth')

router.post('/Ask', auth, askQuestionController)
router.get('/get', getAllQuestionController)
router.delete('/delete/:id', auth, deleteQuestionController)
router.patch('/vote/:id', auth, voteQuestionController)

module.exports = router;
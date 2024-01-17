const { deleteAnswerController, postAnswerController } = require('../controllers/answerController');
const { auth } = require('../middlewares/auth')
const router = require('express').Router();

router.patch('/post/:id', auth, postAnswerController);
router.patch('/delete/:id', auth, deleteAnswerController);

module.exports = router;
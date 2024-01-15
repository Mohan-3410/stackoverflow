const { postAnswerController } = require('../controllers/answerController');

const router = require('express').Router();

router.patch('/post/:id', postAnswerController)

module.exports = router;
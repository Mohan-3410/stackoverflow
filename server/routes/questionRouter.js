const router = require('express').Router();
const { getAllQuestionController, askQuestionController } = require('../controllers/questionController');


router.post('/Ask', askQuestionController)
router.get('/get', getAllQuestionController)
module.exports = router;
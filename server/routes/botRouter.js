const { requestOTPController, verifyOTPController, getBotController } = require('../controllers/botController');
const { chatBotController } = require('../controllers/featuresController');
const { auth } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/sendOtp', auth, requestOTPController)
router.post('/verifyOtp', auth, verifyOTPController)
router.get('/getbot', auth, getBotController)
router.post('/chat', chatBotController)

module.exports = router;
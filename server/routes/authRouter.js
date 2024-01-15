const router = require('express').Router();
const { signupController, loginController } = require('../controllers/authController');

router.post('/signup', signupController);
router.post('/login', loginController);

module.exports = router;
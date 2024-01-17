const router = require('express').Router();
const { updateUserController, getAllUsersController, signupController, loginController } = require('../controllers/authController');
const { auth } = require('../middlewares/auth')

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/getAllUsers', getAllUsersController);
router.patch('/update/:id', auth, updateUserController)
module.exports = router;
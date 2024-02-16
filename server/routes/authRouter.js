const router = require('express').Router();
const { updateUserController, getAllUsersController, signupController, loginController, updatedSubscribedUserController } = require('../controllers/authController');
const { getWeatherController, updateSubscriptionController } = require('../controllers/featuresController');
const { auth } = require('../middlewares/auth')

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/getAllUsers', getAllUsersController);
router.patch('/update/:id', auth, updateUserController)
router.get('/weather', getWeatherController);
router.post('/update-subscription', auth, updateSubscriptionController)
router.get('/update-user', auth, updatedSubscribedUserController)
module.exports = router;
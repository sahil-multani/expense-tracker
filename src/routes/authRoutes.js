const router = require('express').Router();
const authController = require('../controller/authController');
const func = require('../config');

router.post(func.url.SIGNUP, authController.signUpController);
router.post(func.url.LOGIN, authController.loginController);

module.exports = router;

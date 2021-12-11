const router = require('express').Router();
const authController = require('../controller/authController');
const func = require('../config');
router.post(func.url.SIGNUP, authController.signUpController);
module.exports = router;

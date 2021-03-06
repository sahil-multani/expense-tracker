const router = require('express').Router();
const url = require('../config').url;
const mailController = require('../controller/mailController');
const middleware = require('../middleware/verifyToken');
router.get(url.SEND_MAIL, middleware, mailController.sendMailController);
router.get(url.VERIFY_MAIL, mailController.verifyMailController);
module.exports = router;

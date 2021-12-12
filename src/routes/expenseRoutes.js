const func = require('../config');
const router = require('express').Router();
const expenseController = require('../controller/expenseController');
const verifyToken = require('../middleware/verifyToken');

router.post(
	func.url.CREATE_EXPENSE,
	verifyToken,
	expenseController.createExpenseController,
);

module.exports = router;

const expenseController = require('../controller/expenseController');
const func = require('../config');
const middleware = require('../middleware/verifyToken');
const mongoose = require('mongoose');
const router = require('express').Router();

router.get(
	func.url.GET_EXPENSE,
	middleware,
	expenseController.getExpenseController,
);
router.post(
	func.url.UPDATE_QUANTITY,
	middleware,
	expenseController.updateLaundryQuantityController,
);
module.exports = router;

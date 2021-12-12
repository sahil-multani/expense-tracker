const expenseService = require('../services/expenseService');

const createExpenseController = async (req, res) => {
	let response = await expenseService.createExpenseService(req.body);
	res.send(response);
};

module.exports = { createExpenseController };

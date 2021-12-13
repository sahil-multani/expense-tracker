const expenseService = require('../services/expenseService');

const getExpenseController = async (req, res) => {
	console.log(req.body);
	let response = await expenseService.getExpenseService(req.body);
	res.send(response);
};

module.exports = { getExpenseController };

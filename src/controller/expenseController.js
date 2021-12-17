const expenseService = require('../services/expenseService');

const getExpenseController = async (req, res) => {
	console.log(req.body);
	let response = await expenseService.getExpenseService(req.body);
	res.send(response);
};

const updateLaundryQuantityController = async (req, res) => {
	let response = await expenseService.updateLaundryQuantityService(req.body);
	res.send(response);
};
module.exports = { getExpenseController, updateLaundryQuantityController };

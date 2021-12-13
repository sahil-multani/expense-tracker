const expenseModel = require('../model/expenseModel');
const func = require('../config');

const _ = require('lodash');
const errRes = _.cloneDeep(func.response.serverError);
const succRes = _.cloneDeep(func.response.sucess);

const getExpenseService = (body) => {
	return new Promise(async (resolve) => {
		console.log(body);
		const { userId } = body;

		expenseModel.findOne({ userId }, (err, doc) => {
			if (err) return resolve(errRes);
			succRes['data'] = doc.expense;
			return resolve(succRes);
		});
	});
};

module.exports = { getExpenseService };

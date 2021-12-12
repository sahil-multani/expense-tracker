const expenseModel = require('../model/expenseModel');
const userModel = require('../model/userModel');
const validate = require('../helpers/validationError');
const func = require('../config');
const _ = require('lodash');

const errRes = _.cloneDeep(func.response.badRequest);
const succRes = _.cloneDeep(func.response.sucess);

const createExpenseService = (body) => {
	return new Promise(async (resolve) => {
		let expense = new expenseModel(body);
		expense.validate((err) => {
			if (err) {
				errRes['data'] = validate(err);
				return resolve(errRes);
			}
			let { expense } = body;
			if (!expense) {
				errRes['data'] = [{ expense: 'expense is required' }];
				return resolve(errRes);
			}
			expenseModel.findOneAndUpdate(
				{ userId: body.userId },
				{ $push: { expense } },
				{ new: true },
				(err, doc) => {
					if (err) {
						console.log({ err });
						return resolve(err);
					}
					console.log(doc);
					return resolve(doc);
				},
			);
		});
	});
};

module.exports = {
	createExpenseService,
};

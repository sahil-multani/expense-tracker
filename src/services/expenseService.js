const expenseModel = require('../model/expenseModel');
const func = require('../config');

const _ = require('lodash');
const errRes = _.cloneDeep(func.response.badRequest);
const succRes = _.cloneDeep(func.response.sucess);
const serverErr = _.cloneDeep(func.response.serverError);
const notFound = _.cloneDeep(func.response.notFound);
const { ObjectId } = require('bson');
const getExpenseService = (body) => {
	return new Promise(async (resolve) => {
		console.log(body);
		const { userId } = body;

		expenseModel.aggregate(
			[
				{
					$match: {
						userId: new ObjectId(userId),
					},
				},
				{
					$project: {
						userId: 0,
						updatedAt: 0,
					},
				},
			],
			(err, res) => {
				if (err) {
					serverErr['data'] = err;
					return resolve(serverErr);
				}
				succRes['data'] = res;
				return resolve(succRes);
			},
		);
	});
};

const updateLaundryQuantityService = (body) => {
	return new Promise(async (resolve) => {
		expenseModel.findOneAndUpdate(
			{ 'user.id': body.userId },
			{ new: true },
			(err) => {
				if (err) return resolve(err);
				return resolve(succRes);
			},
		);
	});
};

module.exports = { getExpenseService, updateLaundryQuantityService };

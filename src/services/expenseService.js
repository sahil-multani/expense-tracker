const expenseModel = require('../model/expenseModel');
const func = require('../config');

const _ = require('lodash');
const errRes = _.cloneDeep(func.response.badRequest);
const succRes = _.cloneDeep(func.response.sucess);
const serverErr = _.cloneDeep(func.response.serverError);
const notFound = _.cloneDeep(func.response.notFound);
const ok = _.cloneDeep(func.response.created);
const { ObjectId } = require('bson');
const getExpenseService = (body) => {
	return new Promise(async (resolve) => {
		console.log(body);
		const { userId } = body;

		expenseModel.aggregate(
			[
				{
					$match: {
						userId: userId,
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
		if (!body.id) {
			errRes['data'] = [{ id: 'id is required' }];
			return resolve(errRes);
		}
		let { quantity, id } = body;
		if (quantity) {
			body['cost'] = quantity * 15;
		}

		expenseModel.findByIdAndUpdate(
			id,
			{ ...body },
			{ new: true },
			(err, doc) => {
				if (err) return resolve(err);
				return resolve(ok);
			},
		);
	});
};

module.exports = { getExpenseService, updateLaundryQuantityService };

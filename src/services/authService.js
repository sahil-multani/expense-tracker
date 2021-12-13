const userModel = require('../model/userModel');
const validate = require('../helpers/validationError');
const _ = require('lodash');
const func = require('../config').response;
const jwtKey = require('../config').jwtKey;
const bycrypt = require('bcrypt');
const errRes = _.cloneDeep(func.badRequest);
const succRes = _.cloneDeep(func.created);
const jwt = require('jsonwebtoken');
const expenseModel = require('../model/expenseModel');
const signUpService = (body) => {
	return new Promise(async (resolve, reject) => {
		let newUser = new userModel(body);
		newUser.validate(function (err) {
			if (err) {
				errRes['data'] = validate(err);
				return resolve(errRes);
			}
			newUser.password = bycrypt.hashSync(newUser.password, 12);
			newUser.save(function (err, doc) {
				if (err) {
					if (err.code === 11000) {
						errRes['msg'] = 'email already exist !';
						return resolve(errRes);
					}

					return resolve(func.serverError);
				}
				const expense = new expenseModel({
					userId: doc._id,
					expense: [
						{
							laundry: { quantity: 0, cost: 0 },
							breakFast: true,
							lunch: true,
							dinner: true,
						},
					],
				});

				expense.save((err, expenseDoc) => {
					if (err) return resolve(err);
					return resolve(expenseDoc);
				});
				// return resolve(succRes);
			});
		});
	});
};

const loginService = (body) => {
	return new Promise(async (resolve) => {
		const { email, password } = body;
		console.log(body);
		if (!email || !password) {
			errRes['msg'] = 'credentials required !';
			return resolve(errRes);
		}
		userModel.findOne({ email }, async (err, doc) => {
			if (err) {
				return resolve(errRes);
			}
			const isMatch = bycrypt.compareSync(password, doc.password);
			if (!isMatch) {
				errRes['msg'] = 'invalid credentials';
				return resolve(errRes);
			}
			let token = await jwt.sign({ uid: doc._id }, jwtKey);

			succRes.data = { token };
			return resolve(succRes);
		});
	});
};

module.exports = { signUpService, loginService };

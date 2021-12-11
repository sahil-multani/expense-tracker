const userModel = require('../model/userModel');
const validate = require('../helpers/validationError');
const _ = require('lodash');
const func = require('../config').response;
const bycrypt = require('bcrypt');
const errRes = _.cloneDeep(func.badRequest);
const succRes = _.cloneDeep(func.created);
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
				} else {
					return resolve(succRes);
				}
			});
		});
	});
};
module.exports = { signUpService };

const userModel = require('../model/userModel');
const func = require('../config');
const _ = require('lodash');
const sendMail = require('../helpers/sendMail');
const jwt = require('jsonwebtoken');

const sendMailService = (body) => {
	return new Promise(async (resolve) => {
		userModel.findById(body.userId, async (err, doc) => {
			if (err) {
				console.log(err);
				let errRes = _.cloneDeep(func.response.serverError);
				return resolve(errRes);
			}

			let { email, firstName } = doc;
			console.log(doc);
			let key = func.jwtKey;
			let token = jwt.sign({ email }, key);
			let isSend = await sendMail(firstName, email, token);

			let errRes = _.cloneDeep(func.response.badRequest);
			let ok = _.cloneDeep(func.response.created);
			if (isSend) return resolve(ok);
			return resolve(errRes);
		});
	});
};

const verifyMailService = (req) => {
	return new Promise(async (resolve) => {
		let token = req.params.token;
		jwt.verify(token, func.jwtKey, (error, decoded) => {
			if (error) {
				let errorRes = _.cloneDeep(func.response.badRequest);
				return resolve(errorRes);
			}
			userModel.findOneAndUpdate(
				{ email: decoded.email },
				{ verified: true },
				(err, doc) => {
					return resolve({ err, doc });
				},
			);
		});
	});
};

module.exports = { sendMailService, verifyMailService };

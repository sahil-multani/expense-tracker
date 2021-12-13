const func = require('../config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const userModel = require('../model/userModel');

const invalidToken = _.cloneDeep(func.response.invalidToken);

const verfiyToken = async (req, res, next) => {
	const token = req.header('token');
	if (!token) {
		return res.send(invalidToken);
	}

	jwt.verify(token, func.jwtKey, (err, decoded) => {
		if (err) {
			return res.send(invalidToken);
		}

		userModel.findOne({ _id: decoded.uid }, (err, doc) => {
			if (err || !doc) return res.send(invalidToken);
			req.body.userId = decoded.uid;

			return next();
		});
	});
};
module.exports = verfiyToken;

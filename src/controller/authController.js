const authService = require('../services/authService');

const signUpController = async (req, res) => {
	let response = await authService.signUpService(req.body);

	res.send(response);
};

const loginController = async (req, res) => {
	let response = await authService.loginService(req.body);
	res.send(response);
};
module.exports = { signUpController, loginController };

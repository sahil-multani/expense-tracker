const authService = require('../services/authService');
const signUpController = async (req, res) => {
	let response = await authService.signUpService(req.body);
	console.log(response);
	res.send(response);
};

module.exports = { signUpController };

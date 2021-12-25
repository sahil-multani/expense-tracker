const mailService = require('../services/mailService');

const sendMailController = async (req, res) => {
	let response = await mailService.sendMailService(req.body);
	res.send(response);
};
const verifyMailController = async (req, res) => {
	let response = await mailService.verifyMailService(req);
	res.send(response);
};

module.exports = { sendMailController, verifyMailController };

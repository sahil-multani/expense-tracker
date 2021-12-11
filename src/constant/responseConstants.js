module.exports = {
	sucess: {
		sucess: true,
		statusCode: 200,
		data: [],
	},
	created: {
		sucess: true,
		statusCode: 201,
		data: [],
	},
	badRequest: {
		success: false,
		statusCode: 400,
	},
	serverError: {
		success: false,
		statusCode: 500,
		msg: 'something went wrong ',
	},
};

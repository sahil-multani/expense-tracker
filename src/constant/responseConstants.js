module.exports = {
	sucess: {
		success: true,
		statusCode: 200,
		data: [],
	},
	created: {
		success: true,
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
	invalidToken: {
		success: false,
		statusCode: 401,
		msg: 'invalid auth token',
	},
	notFound: {
		success: false,
		statusCode: 404,
		msg: 'not found',
	},
};

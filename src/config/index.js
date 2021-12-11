const urlConstants = require('../constant/urlConstants');
const mongoose = require('mongoose');
const responseConstants = require('../constant/responseConstants');
module.exports = {
	url: urlConstants,
	response: responseConstants,
	connectDB: () => {
		mongoose
			.connect(urlConstants.DB_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('Database is connected');
			})
			.catch((err) => {
				console.log({ err });
				process.exit(1);
			});
	},
};

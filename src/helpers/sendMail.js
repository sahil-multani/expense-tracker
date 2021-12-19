const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'birthday.reminder.app.service@gmail.com',
		pass: 'birthdayreminder',
	},
});

const readHTMLFile = function (path, callback) {
	fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
		if (err) {
			callback(err);
			throw err;
		} else {
			callback(null, html);
		}
	});
};

const sendMail = (name, to, token) => {
	console.log({ name, to, token });
	console.log(__dirname + '/../static/verifyMail.html');
	return new Promise(async (resolve) => {
		readHTMLFile(
			__dirname + '/../static/verifyMail.html',
			function (err, html) {
				const template = handlebars.compile(html);
				const replacements = {
					token,
					name,
				};
				const htmlToSend = template(replacements);
				let mailOptions = {
					from: 'trackmyexpense@gmail.com',
					to,
					subject: 'Verify email',
					html: htmlToSend,
				};
				mailTransporter.sendMail(mailOptions, function (error, response) {
					if (error) {
						resolve(false);
					} else resolve(true);
				});
			},
		);
	});
};

module.exports = sendMail;

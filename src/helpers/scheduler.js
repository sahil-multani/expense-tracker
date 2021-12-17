const expenseModel = require('../model/expenseModel');
const cron = require('node-cron');
const _ = require('lodash');
const userModel = require('../model/userModel');
const createDailyExpense = () => {
	userModel.find(function (err, doc) {
		if (err) return console.log('error while scheduling ');
		doc.forEach((user) => {
			let expense = new expenseModel({ userId: user._id });
			expense.save((err, expenseDoc) => {
				if (err) return console.log('save error');
				console.log(expenseDoc);
			});
		});
	});
};

const scheduleCreateExpenses = () => {
	console.log('scheduler config set to call at 00:00');
	cron.schedule('59 23 * * *', () => {
		createDailyExpense();
	});
};

scheduleCreateExpenses();

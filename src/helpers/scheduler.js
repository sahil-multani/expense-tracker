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
	cron.schedule('0 0 * * *', () => {
		createDailyExpense();
	});
};

scheduleCreateExpenses();

// var CronJob = require('cron').CronJob;
// var job = new CronJob(
// 	'00 00 12 * * 0-6',
// 	function () {
// 		createDailyExpense();
// 		/*
// 		 * Runs every day
// 		 * at 12:00:00 AM.
// 		 */
// 	},
// 	function () {
// 		/* This function is executed when the job stops */
// 	},
// 	true /* Start the job right now */,
// );

// job.start();

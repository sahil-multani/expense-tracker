const expenseModel = require('../model/expenseModel');
const cron = require('node-cron');
const createDailyExpense = () => {
	expenseModel.find(async (err, expenseDocs) => {
		expenseDocs.forEach(async (expenseDoc) => {
			expenseDoc.expense.push({
				laundry: { quantity: 0, cost: 0 },
				breakFast: true,
				lunch: true,
				dinner: true,
			});

			await expenseDoc.save((err, doc) => {
				if (err) return console.log(err);
				console.log(doc);
			});
		});
		console.log(expenseDocs);
		return;
	});
};

const scheduleCreateExpenses = () => {
	console.log('scheduler config set to call at 00:00');
	cron.schedule('0 0 * * *', () => {
		console.log('everyday at 00:00');
		createDailyExpense();
	});
};

module.exports = scheduleCreateExpenses;

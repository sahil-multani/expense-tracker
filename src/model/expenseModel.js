const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const expenseTrackerSchema = new Schema({
	userId: { type: ObjectId, required: true },
	expense: [
		{
			laundry: {
				quantity: { type: Number, default: 1, required: true },
				cost: {
					type: Number,
				},
			},
			breakFast: { type: Boolean, default: true, required: true },
			lunch: { type: Boolean, default: true, required: true },
			dinner: { type: Boolean, default: true, required: true },
			createdAt: { type: String, default: Date.now },
			updatedAt: { type: String, default: Date.now },
		},
	],
});

expenseTrackerSchema.pre('save', function (next) {
	let { quantity } = this.expense[0];
	// if (quantity) {
	this.expense[0].cost = quantity * 15;
	// }

	console.log(`this ::=>>>>>>>>>>>>>`, this.expense[0]);
	next();
});
const expenseModel = mongoose.model('expenses', expenseTrackerSchema);

module.exports = expenseModel;

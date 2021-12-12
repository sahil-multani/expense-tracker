const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const expenseTrackerSchema = new Schema({
	userId: { type: ObjectId, required: true },
	expense: [
		{
			laundry: {
				quantity: { type: Number, default: 0, required: true },
				cost: { type: Number, default: 0, required: true },
			},
			breakFast: { type: Boolean, default: true, required: true },
			lunch: { type: Boolean, default: true, required: true },
			dinner: { type: Boolean, default: true, required: true },
			createdAt: { type: String, default: Date.now },
			updatedAt: { type: String, default: Date.now },
		},
	],
});

const expenseModel = mongoose.model('expenses', expenseTrackerSchema);

module.exports = expenseModel;

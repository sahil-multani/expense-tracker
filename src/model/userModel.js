const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	isDeleted: { type: Boolean, default: false },
	createdAt: { type: String, default: Date.now },
	updatedAt: { type: String, default: Date.now },
	profile: { type: String, default: '' },
	verified: { type: Boolean, default: false },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

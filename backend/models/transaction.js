const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Transaction = new Schema({
	date: {
		type: Date,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	typeOfTransaction: {
		type: String,
		required: true,
	},
	transactionId: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Transaction', Transaction);

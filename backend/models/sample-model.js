const mongoose = require('mongoose');

const SampleSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const SampleSchemaModel = mongoose.model('SampleSchema', SampleSchema);

module.exports = SampleSchemaModel;

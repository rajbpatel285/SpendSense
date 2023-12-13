const SampleSchemaModel = require('../../models/sample-model');

const findData = async (req, res) => {
	try {
		const result = await SampleSchemaModel.find();
		res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

module.exports = findData;

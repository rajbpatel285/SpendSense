const SampleSchemaModel = require('../../models/sample-model');

const addData = async (req, res) => {
	const data = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	};

	try {
		const result = await SampleSchemaModel.create(data);
		res.status(200).json(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

module.exports = addData;

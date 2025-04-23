const CovidData = require('../models/CovidData');

// Get all records
exports.getAllData = async (req, res) => {
  try {
    const data = await CovidData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

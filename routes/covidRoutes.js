const express = require('express');
const router = express.Router();
const CovidData = require('../models/CovidData');

// Add new COVID record
router.post('/add', async (req, res) => {
  try {
    const { state, cases, deaths, date } = req.body;

    const newData = new CovidData({ state, cases, deaths, date });
    await newData.save();

    res.status(201).json({ message: 'Data added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add data.' });
  }
});

// Update existing COVID record for a state
router.post('/update', async (req, res) => {
  try {
    const { state, cases, deaths, date } = req.body;

    const result = await CovidData.findOneAndUpdate(
      { state },
      { cases, deaths, date },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'State not found.' });
    }

    res.json({ message: 'Data updated successfully!', updatedData: result });
  } catch (error) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const data = await CovidData.find();
    res.json(data);  // This should return an array
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});
  

// Get total cases & deaths for a state
router.get('/totals/:state', async (req, res) => {
  const stateParam = req.params.state;
  try {
    const records = await CovidData.find({
      state: { $regex: new RegExp(stateParam.trim(), 'i') }
    });

    if (records.length === 0) {
      return res.status(404).json({ message: 'No records found' });
    }

    const totalCases = records.reduce((sum, record) => sum + record.cases, 0);
    const totalDeaths = records.reduce((sum, record) => sum + record.deaths, 0);

    res.status(200).json({
      state: stateParam,
      totalCases,
      totalDeaths
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching totals', error: err.message });
  }
});

// Delete a record by state
router.post('/delete', async (req, res) => {
  const { state } = req.body;
  try {
    const deleted = await CovidData.findOneAndDelete({ state });
    if (!deleted) {
      return res.status(404).json({ message: 'No record found for this state' });
    }
    res.status(200).json({ message: 'Record deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting record', error: err.message });
  }
});

// Retrieve records where deaths exceed a user-specified value for a given state
router.get('/filter', async (req, res) => {
    const { state, deathThreshold } = req.query;
  
    if (!state || !deathThreshold) {
      return res.status(400).json({ message: 'State and deathThreshold are required' });
    }
  
    try {
      // Convert the deathThreshold to a number (it's passed as a string in the query)
      const threshold = Number(deathThreshold);
  
      // Find all records for the given state where deaths exceed the threshold
      const filteredRecords = await CovidData.find({
        state: { $regex: new RegExp(state.trim(), 'i') },  // case-insensitive match
        deaths: { $gt: threshold }  // deaths greater than the threshold
      });
  
      if (filteredRecords.length === 0) {
        return res.status(404).json({ message: 'No records found matching the criteria' });
      }
  
      res.status(200).json({ data: filteredRecords });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving filtered data', error: err.message });
    }
  });

  // Retrieve all states where cases and deaths exceed a user-specified threshold
router.get('/highCasesAndDeaths', async (req, res) => {
    const { caseThreshold, deathThreshold } = req.query;
  
    // Ensure both thresholds are provided
    if (!caseThreshold || !deathThreshold) {
      return res.status(400).json({ message: 'caseThreshold and deathThreshold are required' });
    }
  
    try {
      // Convert the thresholds to numbers (they come as strings in the query)
      const caseLimit = Number(caseThreshold);
      const deathLimit = Number(deathThreshold);
  
      // Find states where both cases and deaths exceed the specified thresholds
      const highStates = await CovidData.aggregate([
        {
          $group: {
            _id: "$state",  // Group by state
            totalCases: { $sum: "$cases" },  // Sum the cases for each state
            totalDeaths: { $sum: "$deaths" },  // Sum the deaths for each state
          }
        },
        {
          $match: {
            totalCases: { $gt: caseLimit },  // Only include states with totalCases > caseThreshold
            totalDeaths: { $gt: deathLimit }  // Only include states with totalDeaths > deathThreshold
          }
        }
      ]);
  
      if (highStates.length === 0) {
        return res.status(404).json({ message: 'No states found matching the criteria' });
      }
  
      // Send the result with states and their corresponding cases and deaths
      res.status(200).json({ data: highStates });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving high cases and deaths data', error: err.message });
    }
  });
  
  
// Exported for use in server.js
module.exports = router;

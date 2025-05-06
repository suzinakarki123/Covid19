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

    const updated = await CovidData.findOneAndUpdate(
      { state: state }, // match by state
      {
        $set: {
          cases: cases,
          deaths: deaths,
          date: date
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json({ message: 'Data updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Server error during update' });
  }
});

router.get('/states', async (req, res) => {
  try {
    // Fetch unique states from your database
    const states = await CovidData.distinct('state'); // 'state' is the field containing state names
    res.json(states);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Case-insensitive search by state
    const query = search ? { state: { $regex: search, $options: 'i' } } : {};

    const totalCount = await CovidData.countDocuments(query);
    const data = await CovidData.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

  

// Get total cases & deaths for a state
router.get('/totals/:state', async (req, res) => {
  try {
    const { state } = req.params;

    // Fetch the total cases and deaths for the given state
    const result = await CovidData.aggregate([
      { $match: { state: { $regex: new RegExp('^' + state + '$', 'i') } } },
      { $group: { _id: "$state", totalCases: { $sum: "$cases" }, totalDeaths: { $sum: "$deaths" } } }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'State not found or no data available.' });
    }

    res.json(result[0]); // Return the result object with total cases and deaths
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch total cases and deaths.' });
  }
});

// Delete a record by state
router.delete('/delete/:state', async (req, res) => {
  try {
    const { state } = req.params;

    // Delete the document for the given state
    const result = await CovidData.deleteOne({ state: { $regex: new RegExp('^' + state + '$', 'i') } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'State not found or no data available.' });
    }

    res.status(200).json({ message: `State ${state} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete data.' });
  }
});


// Retrieve records where deaths exceed a user-specified value for a given state
router.get('/filter-deaths', async (req, res) => {
  try {
    const { deaths } = req.query;

    // Fetch the records where deaths exceed the given value
    const results = await CovidData.find({ deaths: { $gt: Number(deaths) } })
      .limit(20);  // Limit to first 20 records

    if (results.length === 0) {
      return res.status(404).json({ message: 'No records found with deaths exceeding this value.' });
    }

    res.json(results);  // Return the filtered data
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch filtered data based on deaths.' });
  }
});


router.get('/high-risk', async (req, res) => {
  try {
    const { cases, deaths, page = 1, limit = 10 } = req.query;

    const query = {
      cases: { $gt: Number(cases) || 0 },
      deaths: { $gt: Number(deaths) || 0 }
    };

    const total = await CovidData.countDocuments(query);
    const results = await CovidData.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: results,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch high risk states.' });
  }
});

  
  
// Exported for use in server.js
module.exports = router;

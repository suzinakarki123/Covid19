const mongoose = require('mongoose');

const covidSchema = new mongoose.Schema({
  state: String,
  cases: Number,
  deaths: Number,
  date: Date
});

module.exports = mongoose.model('CovidData', covidSchema, 'CovidData');

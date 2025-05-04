import React, { useState } from 'react';
import { addCovidData } from '../services/api';

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    cases: '',
    deaths: '',
    date: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCovidData({
        state: formData.state,
        cases: parseInt(formData.cases),
        deaths: parseInt(formData.deaths),
        date: formData.date
      });
      setMessage('Data added successfully!');
      setFormData({ state: '', cases: '', deaths: '', date: '' });
    } catch (err) {
      setMessage('Failed to add data.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add COVID-19 Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="state" value={formData.state} placeholder="State" onChange={handleChange} required /><br />
        <input type="number" name="cases" value={formData.cases} placeholder="Cases" onChange={handleChange} required /><br />
        <input type="number" name="deaths" value={formData.deaths} placeholder="Deaths" onChange={handleChange} required /><br />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required /><br />
        <button type="submit">Add Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddDataForm;

import React, { useState } from 'react';
import { updateCovidData } from '../services/api';

const UpdateDataForm = () => {
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
      await updateCovidData({
        state: formData.state,
        cases: parseInt(formData.cases),
        deaths: parseInt(formData.deaths),
        date: formData.date
      });
      setMessage('Data updated successfully!');
      setFormData({ state: '', cases: '', deaths: '', date: '' });
    } catch (err) {
      setMessage('Failed to update data.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Update COVID-19 Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="state" value={formData.state} placeholder="State (to update)" onChange={handleChange} required /><br />
        <input type="number" name="cases" value={formData.cases} placeholder="New Cases" onChange={handleChange} required /><br />
        <input type="number" name="deaths" value={formData.deaths} placeholder="New Deaths" onChange={handleChange} required /><br />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required /><br />
        <button type="submit">Update Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateDataForm;

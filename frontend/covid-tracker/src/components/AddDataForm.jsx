import React, { useState } from 'react';
import { addCovidData } from '../services/api';

const AddDataForm = () => {
  const [formData, setFormData] = useState({ state: '', cases: '', deaths: '', date: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCovidData(formData);
    alert("Data added successfully");
    setFormData({ state: '', cases: '', deaths: '', date: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add COVID Data</h2>
      <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
      <input name="cases" type="number" placeholder="Cases" value={formData.cases} onChange={handleChange} required />
      <input name="deaths" type="number" placeholder="Deaths" value={formData.deaths} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddDataForm;

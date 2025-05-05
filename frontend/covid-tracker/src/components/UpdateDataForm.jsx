import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDataForm = () => {
  const { state } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cases: '',
    deaths: '',
    date: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/covid/total/${state}`);
        if (res.data) {
          setFormData({
            cases: res.data.cases,
            deaths: res.data.deaths,
            date: res.data.date?.substring(0, 10) || ''
          });
        }
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchData();
  }, [state]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/covid/update`, {
        state,
        ...formData
      });
      alert('Data updated successfully');
      navigate('/view'); // or wherever your data table route is
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Update COVID Data for {state}</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="cases" value={formData.cases} onChange={handleChange} placeholder="Cases" required />
        <input type="number" name="deaths" value={formData.deaths} onChange={handleChange} placeholder="Deaths" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <button type="submit">Update Data</button>
      </form>
    </div>
  );
};

export default UpdateDataForm;

import React, { useState } from 'react';
import { deleteCovidData } from '../services/api';

const DeleteRecord = () => {
  const [stateInput, setStateInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteCovidData(stateInput);
      setMessage(response.data.message);
      setStateInput('');
    } catch (err) {
      setMessage('Failed to delete data or state not found.');
    }
  };

  return (
    <div>
      <h2>Delete COVID-19 Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter state to delete"
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
          required
        />
        <button type="submit">Delete Record</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteRecord;

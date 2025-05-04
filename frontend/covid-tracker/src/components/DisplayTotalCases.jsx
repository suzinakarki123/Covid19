import React, { useState } from 'react';
import { getTotalCasesAndDeaths  } from '../services/api';

const TotalCasesDisplay = () => {
  const [state, setState] = useState('');
  const [totalCases, setTotalCases] = useState(null);
  const [totalDeaths, setTotalDeaths] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getTotalCasesAndDeaths(state);
      setTotalCases(response.data.totalCases);
      setTotalDeaths(response.data.totalDeaths);
      setMessage('');
    } catch (err) {
      setMessage('State not found or error fetching data.');
      setTotalCases(null);
      setTotalDeaths(null);
    }
  };

  return (
    <div>
      <h2>Display Total COVID-19 Cases & Deaths</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <button type="submit">Get Total</button>
      </form>

      {message && <p>{message}</p>}

      {totalCases !== null && (
        <div>
          <h3>Total Cases: {totalCases}</h3>
          <h3>Total Deaths: {totalDeaths}</h3>
        </div>
      )}
    </div>
  );
};

export default TotalCasesDisplay;

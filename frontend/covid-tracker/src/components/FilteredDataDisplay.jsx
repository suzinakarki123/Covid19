import React, { useState } from 'react';
import axios from 'axios';
import './FilteredDataDisplay.css';

const FilteredDataDisplay = () => {
  const [deathThreshold, setDeathThreshold] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searched, setSearched] = useState(false);

  const fetchFilteredData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/covid/filter-deaths', {
        params: {
          deaths: deathThreshold,
        }
      });
      setFilteredData(res.data);
      setSearched(true);
    } catch (err) {
      console.error('Failed to fetch filtered data', err);
      setSearched(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredData();
  };

  return (
    <div className="filtered-data-container">
      <h2>Filtered Data - Deaths Exceeding Threshold</h2>
      
      <form onSubmit={handleSubmit} className="threshold-form">
        <input
          type="number"
          placeholder="Enter death threshold"
          value={deathThreshold}
          onChange={(e) => setDeathThreshold(e.target.value)}
          required
        />
        <button type="submit">Filter</button>
      </form>

      {searched ? (
        filteredData.length > 0 ? (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Cases</th>
                  <th>Deaths</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.state}</td>
                    <td>{item.cases}</td>
                    <td>{item.deaths}</td>
                    <td>{item.date?.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No records found with deaths exceeding the threshold.</p>
        )
      ) : (
        <p>Enter a threshold to filter the data.</p>
      )}
    </div>
  );
};

export default FilteredDataDisplay;

import React, { useState } from 'react';
import axios from 'axios';
import './HighRiskStates.css';

const HighRiskStates = () => {
  const [casesThreshold, setCasesThreshold] = useState('');
  const [deathsThreshold, setDeathsThreshold] = useState('');
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searched, setSearched] = useState(false);

  const fetchData = async (currentPage = 1) => {
    try {
      const res = await axios.get('http://localhost:3000/api/covid/high-risk', {
        params: {
          cases: casesThreshold,
          deaths: deathsThreshold,
          page: currentPage,
          limit: 10
        }
      });
      setResult(res.data.data);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setSearched(true);
    } catch (err) {
      console.error('Failed to fetch high risk states', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1 on new search
    fetchData(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchData(newPage);
    }
  };

  return (
    <div className="high-risk-container">
      <h2>High Risk States</h2>
      <form onSubmit={handleSubmit} className="threshold-form">
        <input
          type="number"
          placeholder="Min Cases"
          value={casesThreshold}
          onChange={(e) => setCasesThreshold(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Min Deaths"
          value={deathsThreshold}
          onChange={(e) => setDeathsThreshold(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {searched && result.length > 0 ? (
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
              {result.map((item, index) => (
                <tr key={index}>
                  <td>{item.state}</td>
                  <td>{item.cases}</td>
                  <td>{item.deaths}</td>
                  <td>{item.date?.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Prev
            </button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      ) : searched ? (
        <p>No results found for the given thresholds.</p>
      ) : (
        <p>Enter thresholds and click Search.</p>
      )}
    </div>
  );
};

export default HighRiskStates;

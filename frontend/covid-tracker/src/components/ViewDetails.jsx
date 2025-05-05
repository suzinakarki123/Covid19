import React, { useEffect, useState } from 'react';
// import { getAllData, deleteCovidData } from '../services/api';
import axios from 'axios';

const ViewDetails = () => {
  const [covidData, setCovidData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchData = async (currentPage = 1, searchValue = '') => {
    try {
      const res = await axios.get(`http://localhost:3000/api/covid/all`, {
        params: {
          page: currentPage,
          limit: 10,
          search: searchValue
        }
      });
      setCovidData(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchData(page, search);
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="table-container">
      <h2>COVID-19 Data</h2>

      <input
        type="text"
        placeholder="Search by state..."
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: '15px',
          padding: '8px',
          width: '250px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {covidData.map((item, index) => (
            <tr key={index}>
              <td>{item.state}</td>
              <td>{item.cases}</td>
              <td>{item.deaths}</td>
              <td>{item.date?.substring(0, 10)}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;

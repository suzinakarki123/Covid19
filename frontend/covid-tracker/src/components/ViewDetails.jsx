import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewDetails = () => {
  const [covidData, setCovidData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchData = async (currentPage = 1, searchValue = '') => {
    try {
      const res = await axios.get('http://localhost:3000/api/covid/all', {
        params: {
          page: currentPage,
          limit: 10,
          search: searchValue,
        },
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
    setPage(1); // Reset to first page on search change
  };

  const handleDelete = async (state) => {
    const confirmed = window.confirm(`Are you sure you want to delete the data for ${state}?`);
    if (confirmed) {
      try {
        // Delete request to the backend
        await axios.delete(`http://localhost:3000/api/covid/delete/${state}`);
        alert('Data deleted successfully!');
        // Refresh the data after deletion
        fetchData(page, search);
      } catch (error) {
        console.error('Error deleting data', error);
        alert('Error deleting data.');
      }
    }
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
                <button onClick={() => navigate(`/update/${item.state}`)}>Edit</button>
                <button onClick={() => handleDelete(item.state)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ViewDetails;

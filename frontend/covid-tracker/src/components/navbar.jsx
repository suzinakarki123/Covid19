import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './navbar.css';

const Navbar = () => {
  const [states, setStates] = useState([]);  // Store list of states
  const [state, setState] = useState('');  // Selected state
  const [totalCases, setTotalCases] = useState(0);  // Store total cases for selected state

  // Fetch list of states from the backend
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/covid/states');
        setStates(response.data);  // Set states from the response
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);  // Empty array means it will only run once when the component is mounted

  // Fetch total cases for the selected state
  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setState(selectedState);  // Set selected state

    if (selectedState) {
        try {
          const response = await axios.get(`http://localhost:3000/api/covid/totals/${selectedState}`);
          setTotalCases(response.data.totalCases);  // If you want to also show deaths, you can add it here
        } catch (error) {
          console.error('Error fetching total cases:', error);
          setTotalCases(0);
        }
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">COVID Dashboard</h2>
      <div>
        <Link to="/" className="nav-link">Add Data</Link>
        <Link to="/view" className="nav-link">View Details</Link>
        {/* <Link to="/totals" className="nav-link">Total Details</Link> */}
      </div>

      {/* Dropdown to select state */}
      <div className="state-selector">
        <select onChange={handleStateChange} value={state}>
          <option value="">Select a State</option>
          {states.length > 0 ? (
            states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
        
        {/* Display total cases for selected state */}
        <span>Total Cases: {totalCases}</span>
      </div>
    </nav>
  );
};

export default Navbar;

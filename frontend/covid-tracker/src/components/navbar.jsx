import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const nabvar = () => (
  <nav className="navbar">
    <h2 className="logo">COVID Dashboard</h2>
    <div>
      <Link to="/" className="nav-link">Add Data</Link>
      <Link to="/view" className="nav-link">View Details</Link>
    </div>
  </nav>
);

export default nabvar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import AddDataForm from './components/AddDataForm';
import ViewDetails from './components/ViewDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<AddDataForm />} />
          <Route path="/view" element={<ViewDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

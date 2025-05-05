import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import AddDataForm from './components/AddDataForm';
import ViewDetails from './components/ViewDetails';
import UpdateForm from './components/UpdateDataForm';
import TotalsCases from './components/DisplayTotalCases';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<AddDataForm />} />
          <Route path="/view" element={<ViewDetails />} />
          <Route path="/update/:state" element={<UpdateForm />} />
          <Route path="/totals/:state" element={<TotalsCases />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

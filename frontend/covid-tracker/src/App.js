// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import AllDataDisplay from './components/AllDataDisplay';
import DisplayTotals from './components/DisplayTotalCases';
import DeleteRecord from './components/DeleteRecord';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  return (
    <Router>
      <div>
        <h1>COVID-19 Dashboard</h1>
        <nav>
          <Link to="/add">Add Data</Link>
          <Link to="/update">Update Data</Link>
          <Link to="/all">All Data</Link>
          <Link to="/totals">Totals</Link>
          <Link to="/delete">Delete Record</Link>
          {/* More links for other components later */}
        </nav>

        <Routes>
          <Route path="/add" element={<AddDataForm />} />
          <Route path="/update" element={<UpdateDataForm />} />
          <Route path="/all" element={<AllDataDisplay />} />
          <Route path="/totals" element={<DisplayTotals />} />
          <Route path="/delete" element={<DeleteRecord />} />
          

        </Routes>
      </div>
    </Router>
  );
};


export default App;

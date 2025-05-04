import React, { useEffect, useState } from 'react';
import { getAllCovidData } from '../services/api';

const AllDataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCovidData();
        console.log(response.data);  // Log the response data
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h2>All COVID-19 Data</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>State</th>
              <th>Cases</th>
              <th>Deaths</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.state}</td>
                <td>{item.cases}</td>
                <td>{item.deaths}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllDataDisplay;

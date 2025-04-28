import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/covid',
});

// Example basic functions
export const addCovidData = (data) => API.post('/add', data);
export const updateCovidData = (data) => API.post('/update', data);
export const getTotalCasesAndDeaths = (state) => API.get(`/total?state=${state}`);
export const deleteCovidData = (state) => API.post('/delete', { state });
export const getFilteredData = (state, deaths) => API.get(`/filtered?state=${state}&deaths=${deaths}`);
export const getHighCasesAndDeaths = (caseThreshold, deathThreshold) => API.get(`/highCasesAndDeaths?caseThreshold=${caseThreshold}&deathThreshold=${deathThreshold}`);

export default API;

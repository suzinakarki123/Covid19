import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/api/covid',
// });
const API = 'http://localhost:3000/api/covid'

export const addCovidData = async (data) => {
    return await axios.post(`${API}/add`, data);
  };
  export const updateCovidData = async (data) => {
    return await axios.post(`${API}/update`, data);
  };

  export const getAllCovidData = async () => {
    return await axios.get(`${API}/all`);
  };

  export const getTotalCasesAndDeaths = async (state) => {
    return await axios.get(`${API}/totals/${state}`);
  };
  export const deleteCovidData = async (state) => {
    return await axios.delete(`${API}/delete/${state}`);
  };

// Example basic functions
// export const addCovidData = (data) => API.post('${API_BASE_URL}/add', data);
// export const updateCovidData = (data) => API.post('/update', data);
// export const getTotalCasesAndDeaths = (state) => API.get(`/total?state=${state}`);
// export const deleteCovidData = (state) => API.post('/delete', { state });
export const getFilteredData = (state, deaths) => API.get(`/filtered?state=${state}&deaths=${deaths}`);
export const getHighCasesAndDeaths = (caseThreshold, deathThreshold) => API.get(`/highCasesAndDeaths?caseThreshold=${caseThreshold}&deathThreshold=${deathThreshold}`);

export default API;

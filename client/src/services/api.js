import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchYears = async () => {
  const response = await axios.get(`${API_BASE_URL}/years`);
  return response.data;
};

export const fetchStates = async () => {
  const response = await axios.get(`${API_BASE_URL}/states`);
  return response.data;
};

export const fetchCountries = async () => {
  const response = await axios.get(`${API_BASE_URL}/countries`);
  return response.data;
};

export const fetchIncomingAdoptions = async (year) => {
  const response = await axios.get(
    year === 'all'
      ? `${API_BASE_URL}/incoming-adoptions/all`
      : `${API_BASE_URL}/incoming-adoptions/${year}`
  );
  return response.data;
};

export const fetchOutgoingAdoptions = async (year) => {
  const response = await axios.get(
    year === 'all'
      ? `${API_BASE_URL}/outgoing-adoptions/all`
      : `${API_BASE_URL}/outgoing-adoptions/${year}`
  );
  return response.data;
};

export const fetchAdoptionsByState = async (year) => {
  const response = await axios.get(
    year === 'all'
      ? `${API_BASE_URL}/incoming-adoptions-by-state/all`
      : `${API_BASE_URL}/incoming-adoptions-by-state/${year}`
  );
  return response.data;
};

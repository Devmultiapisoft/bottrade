import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com';

export const getBalance = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/balance/${userId}`);
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/order`, orderData);
  return response.data;
};
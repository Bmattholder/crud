import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getItems = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const getItemById = (itemId) => {
  return axios.get(`${API_BASE_URL}/users/${itemId}`);
};

export const createItem = (itemData) => {
  return axios.post(`${API_BASE_URL}/users`, itemData);
};

export const updateItem = (itemId, itemData) => {
  return axios.put(`${API_BASE_URL}/users/${itemId}`, itemData);
};

export const deleteItem = (itemId) => {
  return axios.delete(`${API_BASE_URL}/users/${itemId}`);
};

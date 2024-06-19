// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api', // Replace with your API base URL
});

export const fetchPeople = async (page = 1) => {
    const response = await api.get(`/people/?page=${page}`);
    return response.data;
};
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const userAPI = {
    signup: (data) => axios.post(`${API_URL}/user/signup`, data),
    signin: (data) => axios.post(`${API_URL}/user/signin`, data),
    updateUser: (data, token) => axios.put(`${API_URL}/user/update`, data, { headers: { token } }),
    deleteUser: (data, token) => axios.delete(`${API_URL}/user/delete`, { data, headers: { token } }),
};

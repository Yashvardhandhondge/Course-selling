import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';
// const API_URL = 'http://localhost:3000';

export const chatbotAPI = {
    sendMessage: (data, token) => axios.post(`${API_URL}/chatbot`, data, { headers: { token } }),
};

import axios from 'axios';

const API_URL = 'https://course-selling-two.vercel.app';
// const API_URL = 'http://localhost:3000';

export const searchAPI = {
    searchCourses: (params) => axios.get(`${API_URL}/search/filter`, { params }),
};

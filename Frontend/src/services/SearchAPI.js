import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';

export const searchAPI = {
    searchCourses: (params) => axios.get(`${API_URL}/search/filter`, { params }),
};

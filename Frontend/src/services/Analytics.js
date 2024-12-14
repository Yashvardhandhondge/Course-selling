import axios from 'axios';

const API_URL = 'https://course-selling-two.vercel.app';
// const API_URL = 'http://localhost:3000';

export const analyticsAPI = {
    getMostViewedCourses: (token) => axios.get(`${API_URL}/analytics/most-viewed-corses`, { headers: { token } }),
    getUserActivity: (token) => axios.get(`${API_URL}/analytics/user-activity`, { headers: { token } }),
};

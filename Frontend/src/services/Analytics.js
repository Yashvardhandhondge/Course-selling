import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';

export const analyticsAPI = {
    getMostViewedCourses: (token) => axios.get(`${API_URL}/analytics/most-viewed-corses`, { headers: { token } }),
    getUserActivity: (token) => axios.get(`${API_URL}/analytics/user-activity`, { headers: { token } }),
};

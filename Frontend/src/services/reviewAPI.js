import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';
// const API_URL = 'http://localhost:3000';

export const reviewAPI = {
    addReview: (data, token) => axios.post(`${API_URL}/review/add`, data, { headers: { token } }),
    getCourseReviews: (courseId) => axios.get(`${API_URL}/review/course/${courseId}`),
};

import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';

export const enrollmentAPI = {
    enroll: (data, token) => axios.post(`${API_URL}/enroll`, data, { headers: { token } }),
    updateProgress: (data, token) => axios.put(`${API_URL}/enroll/progress`, data, { headers: { token } }),
    completeCourse: (data, token) => axios.put(`${API_URL}/enroll/complete`, data, { headers: { token } }),
};

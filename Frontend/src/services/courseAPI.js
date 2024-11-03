import axios from 'axios';

const API_URL = 'https://course-selling-3.onrender.com';
// const API_URL = 'http://localhost:3000';

export const courseAPI = {
    getAllCourses: (token) => 
        axios.get(`${API_URL}/get/getcourse`, { headers: { token } }),
    purchaseCourse: (data, token) => 
        axios.post(`${API_URL}/get/purchase`, data, { headers: { token } }),
    getMyCourses: async (token) => {
        const response = await axios.get(`${API_URL}/get/my-courses`, {
            headers: { token } 
        });
        return response;
    },
};

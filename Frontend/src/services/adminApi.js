import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const adminAPI = {
    
    signup: (data) => axios.post(`${API_URL}/admin/signup`, data),
    signin: (data) => axios.post(`${API_URL}/admin/signin`, data),
    
   
    updateAdmin: (data, token) => axios.put(`${API_URL}/admin/update`, data, { headers: { token } }),
    deleteAdmin: (data, token) => axios.delete(`${API_URL}/admin/delete`, { data, headers: { token } }),
    getAdmin: (token) => axios.get(`${API_URL}/admin/profile`, { headers: { token } }),
    
    
    createCourse: (data, token) => axios.post(`${API_URL}/admin/course/create`, data, { headers: { token } }),
    addLesson: (data, token) => axios.put(`${API_URL}/admin/course/add-lesson`, data, { headers: { token } }),
    updateCourse: (data, token) => axios.put(`${API_URL}/admin/course/update`, data, { headers: { token } }),
    getCourses: (token) => axios.get(`${API_URL}/admin/course/get`, { headers: { token } }),
    deleteCourse: (data, token) => axios.delete(`${API_URL}/admin/course/delete`, { data, headers: { token } }),
};

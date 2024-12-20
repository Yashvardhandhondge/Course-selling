import axios from 'axios';

const API_URL = 'https://course-selling-two.vercel.app';
// const API_URL = 'http://localhost:3000';

export const wishlistAPI = {
    addToWishlist: (data, token) => axios.post(`${API_URL}/wishlist/add`, data, { headers: { token } }),
    getWishlist: (userId, token) => axios.get(`${API_URL}/wishlist/${userId}`, { headers: { token } }),
    deleteFromWishlist: (data, token) => axios.delete(`${API_URL}/wishlist/delete`, { data, headers: { token } }),
};

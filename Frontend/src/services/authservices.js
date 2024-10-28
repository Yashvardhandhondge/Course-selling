import { userAPI } from './userAPi';
import { adminAPI } from './adminApi';
import { handleError } from './errorHandler';

const JWT_SECRETE_ADMIN = 'yash ';
const JWT_SECRETE_USER = 'kahi';

export const authService = {
    login: async (credentials, isAdmin = false) => {
        try {
            const api = isAdmin ? adminAPI : userAPI;
            const response = await api.signin(credentials);


            const tokenKey = isAdmin ? JWT_SECRETE_ADMIN : JWT_SECRETE_ADMIN;
            localStorage.setItem(tokenKey, response.data.token);

            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },

    logout: (isAdmin = false) => {
        
        const tokenKey = isAdmin ? JWT_SECRETE_ADMIN : JWT_SECRETE_USER;
        localStorage.removeItem(tokenKey);
    },

    getToken: (isAdmin = false) => {
        
        const tokenKey = isAdmin ? JWT_SECRETE_ADMIN : JWT_SECRETE_USER;
        return localStorage.getItem(tokenKey);
    },

    isAuthenticated: (isAdmin = false) => {

        const tokenKey = isAdmin ? JWT_SECRETE_ADMIN: JWT_SECRETE_USER;
        return !!localStorage.getItem(tokenKey);
    },
};

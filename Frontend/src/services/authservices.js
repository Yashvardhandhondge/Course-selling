import { userAPI } from './userAPi';
import { adminAPI } from './adminApi';
import { handleError } from './errorHandler';

const TOKEN_KEY_ADMIN = 'admin_token';
const TOKEN_KEY_USER = 'user_token';

export const authService = {
    login: async (credentials, isAdmin = false) => {
        try {
            const api = isAdmin ? adminAPI : userAPI;
            const response = await api.signin(credentials);


            const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
            localStorage.setItem(tokenKey, response.data.token);

            return response.data;
        } catch (error) {
            return handleError(error);
        }
    },

    logout: (isAdmin = false) => {
        
        const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
        localStorage.removeItem(tokenKey);
    },

    getToken: (isAdmin = false) => {
        
        const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
        return localStorage.getItem(tokenKey);
    },

    isAuthenticated: (isAdmin = false) => {

        const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
        return !!localStorage.getItem(tokenKey);
    },
};

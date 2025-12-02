import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from '../config/constants.js';

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {        
        const originalRequest = error.config;

        // Handle 401 (Unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            const isAuthEndpoint = originalRequest.url?.includes(API_ENDPOINTS.LOGIN) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.REGISTER) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.REFRESH_TOKEN) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.VERIFY_EMAIL) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.FORGOT_PASSWORD) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.VERIFY_RESET_CODE) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.RESET_PASSWORD) ||
                                  originalRequest.url?.includes(API_ENDPOINTS.LOGOUT);
            
            // Nếu là auth endpoint, throw error luôn
            if (isAuthEndpoint) {
                return Promise.reject(error);
            }
            
            // Thử refresh token
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`, {
                    refreshToken
                });
                
                // Backend trả về { data: { accessToken } }
                const newAccessToken = response.data?.data?.accessToken || response.data?.accessToken;
                
                if (!newAccessToken) {
                    throw new Error('No access token in refresh response');
                }
                
                localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token error:', refreshError);
                
                // Clear storage
                localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER_INFO);
                
                // Chỉ redirect nếu không đang ở trang login
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
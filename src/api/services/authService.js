import axiosInstance from '../axiosConfig';
import { API_ENDPOINTS } from '../../config/constants';

export const authService = {
    login: async (credentials) => {
        const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
        return response;
    },

    register: async (userData) => {
        const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, userData);
        return response;
    },

    logout: async () => {
        const response = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
        localStorage.clear();
        return response;
    },

    verifyEmail: async (otpData) => {
        const response = await axiosInstance.post(API_ENDPOINTS.VERIFY_EMAIL, otpData);
        return response;
    },

    forgotPassword: async (email) => {
        const response = await axiosInstance.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
        return response;
    },

    verifyResetCode: async (otpData) => {
        // otpData = { email, otp }
        const response = await axiosInstance.post(API_ENDPOINTS.VERIFY_RESET_CODE, otpData);
        return response;
    },

    resetPassword: async (resetData) => {
        // resetData = { resetToken, newPassword }
        const response = await axiosInstance.post(API_ENDPOINTS.RESET_PASSWORD, resetData);
        return response;
    },
};
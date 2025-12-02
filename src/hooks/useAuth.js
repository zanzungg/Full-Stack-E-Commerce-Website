import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../App';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const context = useContext(MyContext);
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const login = async (credentials) => {
        try {
            const response = await authContext.login(credentials);
            
            context.openAlertBox("success", response.message || "Login successful!");
            
            // Redirect về trang trước đó hoặc home
            const from = location.state?.from?.pathname || '/';
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);
            
            return response;
        } catch (err) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else if (err.response.status === 404) {
                    errorMessage = 'Account not found';
                } else if (err.response.status === 403) {
                    errorMessage = 'Account is not verified or blocked';
                } else if (err.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
            } else if (err.request) {
                errorMessage = 'Cannot connect to server. Please check your internet connection.';
            } else {
                errorMessage = err.message || 'An unexpected error occurred';
            }
            
            context.openAlertBox("error", errorMessage);
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authContext.register(userData);
            
            context.openAlertBox("success", response.message || "Registration successful! Please verify your email.");
            navigate('/verify', { state: { email: userData.email } });
            
            return response;
        } catch (err) {
            let errorMessage = 'Registration failed';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 409) {
                    errorMessage = 'Email already exists';
                } else if (err.response.status === 400) {
                    errorMessage = 'Invalid data provided';
                }
            } else if (err.request) {
                errorMessage = 'Cannot connect to server. Please check your internet connection.';
            } else {
                errorMessage = err.message || 'An unexpected error occurred';
            }
            
            context.openAlertBox("error", errorMessage);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authContext.logout();
            
            context.openAlertBox("success", "Logged out successfully!");
            
            // Redirect về trang login
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 500);
        } catch (err) {
            console.error('Logout error:', err);
            // Vẫn redirect về login ngay cả khi có lỗi
            navigate('/login', { replace: true });
        }
    };

    return {
        login,
        register,
        logout,
        loading: authContext.authLoading,
        user: authContext.user,
        isAuthenticated: authContext.isAuthenticated
    };
};
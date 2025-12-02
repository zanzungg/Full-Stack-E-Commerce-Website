import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../api/services/authService';
import { STORAGE_KEYS } from '../config/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    // Khôi phục trạng thái khi load trang
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
            const userInfo = localStorage.getItem(STORAGE_KEYS.USER_INFO);
            
            if (token && userInfo) {
                setUser(JSON.parse(userInfo));
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Check auth error:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setAuthLoading(true);
            
            const response = await authService.login(credentials);
            
            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;
            
            if (!accessToken) {
                throw new Error('No access token received from server');
            }
            
            // Save tokens
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            if (refreshToken) {
                localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
            }
            
            // Decode JWT để lấy thông tin user
            try {
                const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
                const userInfo = {
                    id: tokenPayload.id,
                    name: tokenPayload.name,
                    email: tokenPayload.email,
                    role: tokenPayload.role
                };
                localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
                setUser(userInfo);
                setIsAuthenticated(true);
            } catch (decodeError) {
                console.error('Error decoding token:', decodeError);
            }
            
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setAuthLoading(true);
            const response = await authService.register(userData);
            return response;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        try {
            setAuthLoading(true);
            
            // Gọi API logout để invalidate token trên server
            await authService.logout();
            
            console.log('Logged out successfully from server');
        } catch (error) {
            console.error('Logout API error:', error);
            // Vẫn tiếp tục logout ở client ngay cả khi API thất bại
        } finally {
            // Clear tất cả dữ liệu local
            localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_INFO);
            localStorage.removeItem(STORAGE_KEYS.CART_ITEMS);
            
            // Reset state
            setUser(null);
            setIsAuthenticated(false);
            setAuthLoading(false);
        }
    };

    const updateUser = (updatedUserInfo) => {
        setUser(updatedUserInfo);
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(updatedUserInfo));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        authLoading,
        login,
        register,
        logout,
        checkAuth,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    
    return context;
};
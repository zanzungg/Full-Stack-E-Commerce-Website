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
            
            // Navigate sang verify page với email và type
            navigate('/verify', { 
                state: { 
                    email: userData.email,
                    type: 'register' 
                } 
            });
            
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

    const verifyEmail = async (email, otp) => {
        try {
            const response = await authContext.verifyEmail(email, otp);
            
            context.openAlertBox("success", response.message || "Email verified successfully!");
            
            // Navigate về login sau khi verify thành công
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
            
            return response;
        } catch (err) {
            let errorMessage = 'Verification failed';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 400) {
                    errorMessage = 'Invalid OTP';
                } else if (err.response.status === 404) {
                    errorMessage = 'Email not found';
                } else if (err.response.status === 410) {
                    errorMessage = 'OTP has expired. Please request a new one';
                } else if (err.response.status === 429) {
                    errorMessage = 'Too many attempts. Please try again later';
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

    const forgotPassword = async (email) => {
        try {
            const response = await authContext.forgotPassword(email);
            
            context.openAlertBox("success", response.message || `OTP sent to ${email}`);
            
            // Navigate sang verify page
            setTimeout(() => {
                navigate('/verify', { 
                    state: { 
                        email,
                        type: 'reset-password'
                    } 
                });
            }, 1000);
            
            return response;
        } catch (err) {
            let errorMessage = 'Failed to send OTP';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 404) {
                    errorMessage = 'Email not found';
                } else if (err.response.status === 429) {
                    errorMessage = 'Too many requests. Please try again later';
                } else if (err.response.status === 400) {
                    errorMessage = 'Invalid email address';
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

    const verifyResetCode = async (email, otp) => {
        try {
            const response = await authContext.verifyResetCode(email, otp);
            
            context.openAlertBox("success", response.message || "OTP verified successfully!");

            // Navigate sang trang reset password với resetToken
            // Response structure: { message, error, success, resetToken }
            // resetToken ở top level, không phải trong data
            const resetToken = response?.resetToken || 
                                response?.data?.resetToken;
            navigate('/reset-password', {
                state: { 
                    email,
                    resetToken
                }
            });

            return response;
        } catch (err) {
            let errorMessage = 'Verification failed';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 400) {
                    errorMessage = 'Invalid OTP';
                } else if (err.response.status === 410) {
                    errorMessage = 'OTP has expired. Please request a new one';
                } else if (err.response.status === 429) {
                    errorMessage = 'Too many attempts. Please try again later';
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

    const resetPassword = async (resetToken, newPassword) => {
        try {
            const response = await authContext.resetPassword(resetToken, newPassword);
            
            context.openAlertBox("success", response.message || "Password reset successfully!");
            
            // Navigate về login
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
            
            return response;
        } catch (err) {
            let errorMessage = 'Failed to reset password';
            
            if (err.response) {
                const data = err.response.data;
                
                if (data?.message) {
                    errorMessage = data.message;
                } else if (err.response.status === 400 || err.response.status === 401) {
                    errorMessage = 'Invalid or expired reset token';
                    // Redirect về forgot password sau 2s
                    setTimeout(() => {
                        navigate('/forgot-password', { replace: true });
                    }, 2000);
                } else if (err.response.status === 404) {
                    errorMessage = 'User not found';
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

    return {
        login,
        register,
        verifyEmail,
        logout,
        forgotPassword,
        verifyResetCode,
        resetPassword,
        loading: authContext.authLoading,
        user: authContext.user,
        isAuthenticated: authContext.isAuthenticated
    };
};
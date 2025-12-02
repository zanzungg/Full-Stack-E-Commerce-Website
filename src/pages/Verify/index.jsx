import React, { useState, useEffect, useContext } from "react";
import OtpBox from "../../components/OtpBox";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../api/services/authService";

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const { verifyEmail, verifyResetCode, loading } = useAuth();
    
    const [email, setEmail] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [verificationType, setVerificationType] = useState('register');

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
            setVerificationType(location.state.type || 'register');
        } else {
            context.openAlertBox("error", "Please register or request password reset first");
            navigate('/register', { replace: true });
        }
    }, [location, navigate, context]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleOtpComplete = async (otpValue) => {
        console.log("OTP entered:", otpValue);
        
        if (otpValue.length !== 6) {
            context.openAlertBox("error", "Please enter a valid 6-digit OTP");
            return;
        }

        try {
            if (verificationType === 'register') {
                await verifyEmail(email, otpValue);
                
            } else if (verificationType === 'reset-password') {
                await verifyResetCode(email, otpValue);
            }
        } catch (error) {
            console.error('Verify error:', error);
        }
    };

    const handleResendOTP = async () => {
        if (countdown > 0 || resendLoading) {
            return;
        }

        try {
            setResendLoading(true);
            
            let response;
            
            if (verificationType === 'register') {
                response = await authService.register({
                    email,
                    resendOTP: true
                });
            } else if (verificationType === 'reset-password') {
                response = await authService.forgotPassword(email);
            }
            
            context.openAlertBox("success", response.message || `OTP has been resent to ${email}`);
            setCountdown(60);
            
        } catch (error) {
            console.error('Resend OTP error:', error);
            
            let errorMessage = 'Failed to resend OTP';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = 'Cannot connect to server. Please check your internet connection.';
            } else if (error.response?.status === 429) {
                errorMessage = 'Too many requests. Please try again later';
            }
            
            context.openAlertBox("error", errorMessage);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center">
                        <img src="/verify.png" width="70" alt="Verify"/>
                    </div>
                    <h3 className="text-center text-[18px] text-black font-semibold mt-4 mb-1">
                        Verify OTP
                    </h3>

                    <p className="text-center mt-0 text-sm">
                        {verificationType === 'register' 
                            ? 'Please verify your email to complete registration'
                            : 'Please verify OTP to reset your password'
                        }
                        <br />
                        OTP sent to <span className="text-primary font-bold">{email}</span>
                    </p>

                    <OtpBox 
                        onComplete={handleOtpComplete}
                        disabled={loading}
                        loading={loading}
                    />
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Didn't receive code? {" "}
                            <button 
                                onClick={handleResendOTP}
                                disabled={countdown > 0 || resendLoading || loading}
                                className={`font-semibold ${
                                    countdown > 0 || resendLoading || loading
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-blue-600 hover:underline'
                                }`}
                            >
                                {resendLoading 
                                    ? 'Sending...' 
                                    : countdown > 0 
                                    ? `Resend (${countdown}s)` 
                                    : 'Resend'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Verify;
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
    const context = useContext(MyContext);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [formFields, setFormFields] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onChangeField = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formFields.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formFields.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!formFields.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formFields.password !== formFields.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Giả lập reset password
        context.openAlertBox("success", "Password reset successfully!");
        setTimeout(() => {
            navigate('/signIn');
        }, 1500);
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center mb-4">
                        <img src="/reset-password.png" width="70" alt="Reset Password"/>
                    </div>
                    
                    <h3 className="text-center text-[18px] text-black font-semibold mb-2">
                        Reset Password
                    </h3>
                    
                    <p className="text-center text-sm text-gray-600 mb-5">
                        Enter your new password for <span className="font-bold text-primary">{email}</span>
                    </p>

                    <form onSubmit={handleResetPassword} className="w-full">
                        <div className="form-group w-full mb-4 relative">
                            <TextField 
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                label="New Password"
                                variant="outlined"
                                className="w-full"
                                name="password"
                                value={formFields.password}
                                onChange={onChangeField}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <Button 
                                type="button"
                                className="absolute! top-2.5 right-2.5 z-50 w-[35px]! h-[35px]! 
                                min-w-[35px]! rounded-full! text-black!"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoMdEyeOff className="text-[20px] opacity-75"/> : 
                                <IoMdEye className="text-[20px] opacity-75"/>}
                            </Button>
                        </div>

                        <div className="form-group w-full mb-4 relative">
                            <TextField 
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                className="w-full"
                                name="confirmPassword"
                                value={formFields.confirmPassword}
                                onChange={onChangeField}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                            <Button 
                                type="button"
                                className="absolute! top-2.5 right-2.5 z-50 w-[35px]! h-[35px]! 
                                min-w-[35px]! rounded-full! text-black!"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <IoMdEyeOff className="text-[20px] opacity-75"/> : 
                                <IoMdEye className="text-[20px] opacity-75"/>}
                            </Button>
                        </div>

                        <div className="flex items-center w-full mb-4">
                            <Button 
                                type="submit" 
                                className="btn-org btn-lg w-full"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
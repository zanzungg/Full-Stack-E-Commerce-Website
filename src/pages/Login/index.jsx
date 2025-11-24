import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";

const Login = () => {
    const context = useContext(MyContext);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    
    const history = useNavigate();

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
        
        if (!formFields.email.trim()) {
            newErrors.email = 'Email is required';
        }
        
        if (!formFields.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Giả lập login
        context.openAlertBox("success", "Login successful!");
        setTimeout(() => {
            history('/');
        }, 1000);
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <h3 className="text-center text-[18px] text-black font-semibold">Login to your account</h3>
                    <form onSubmit={handleLogin} className="w-full mt-5">
                        <div className="form-group w-full mb-5">
                            <TextField 
                                type="email"
                                id="email"
                                label="Email"
                                variant="outlined"
                                className="w-full"
                                name="email"
                                value={formFields.email}
                                onChange={onChangeField}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </div>

                        <div className="form-group w-full mb-5 relative">
                            <TextField 
                                type={isShowPassword === false ? 'password' : 'text'}
                                id="password"
                                label="Password"
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
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {
                                    isShowPassword === false ? <IoMdEye className="text-[20px] opacity-75"/> :
                                    <IoMdEyeOff className="text-[20px] opacity-75"/> 
                                }
                            </Button>
                        </div> 

                        <Link 
                            to="/forgot-password"
                            className="link cursor-pointer text-[13px] font-semibold"
                        >
                            Forgot Password?
                        </Link>

                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button type="submit" className="btn-org btn-lg w-full">Login</Button>
                        </div>

                        <p className="text-center">Not Registered?
                            <Link className="link text-[13px] font-semibold text-primary" to="/register"> Sign Up</Link>
                        </p>

                        <p className="text-center font-medium">Or continue with social account</p>

                        <Button className="flex gap-3 w-full bg-[#f1f1f1]! btn-lg text-black! font-medium!">
                            <FcGoogle className="text-[20px]"/>Login with Google
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;
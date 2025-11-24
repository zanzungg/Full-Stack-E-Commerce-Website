import React from "react";
import OtpBox from "../../components/OtpBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../App";

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const email = location.state?.email || "example@gmail.com";

    const handleOtpComplete = (otpValue) => {
        console.log("OTP entered:", otpValue);
        
        // Giả lập verify OTP
        if (otpValue === "123456") { // Demo OTP
            context.openAlertBox("success", "OTP verified successfully!");
            setTimeout(() => {
                navigate('/reset-password', { state: { email } });
            }, 1000);
        } else {
            context.openAlertBox("error", "Invalid OTP. Please try again.");
        }
    };

    const handleResendOTP = () => {
        context.openAlertBox("success", `OTP resent to ${email}`);
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
                        OTP sent to <span className="text-primary font-bold">{email}</span>
                    </p>

                    <OtpBox onComplete={handleOtpComplete}/>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Didn't receive code? {" "}
                            <button 
                                onClick={handleResendOTP}
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Verify;
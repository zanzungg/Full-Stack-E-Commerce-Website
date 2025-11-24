import React, { useState, useRef, useEffect } from "react";

const OtpBox = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input
        if (element.value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Call onComplete when all fields are filled
        if (newOtp.every(digit => digit !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, length);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length; i++) {
            if (!isNaN(pastedData[i])) {
                newOtp[i] = pastedData[i];
            }
        }

        setOtp(newOtp);

        // Focus on the next empty input or last input
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex].focus();

        if (newOtp.every(digit => digit !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    return (
        <div className="mt-6">
            <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                ))}
            </div>

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4"
                onClick={() => {
                    if (otp.every(digit => digit !== "")) {
                        onComplete && onComplete(otp.join(""));
                    }
                }}
            >
                Verify OTP
            </button>

            <div className="text-center mt-4">
                <button
                    className="text-blue-600 hover:underline text-sm text-[16px]"
                    onClick={() => setOtp(new Array(length).fill(""))}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default OtpBox;
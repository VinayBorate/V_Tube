import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import Spinner from "../assets/LoderSpin.json";

const OTPpage = ({ setisLogin }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state; // Access form data passed from SignupForm
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!formData) {
            toast.error("Invalid access to OTP page!", { position: "top-center", autoClose: 2000, theme: "dark" });
            navigate("/signup");
        }

        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [formData, navigate]);

    const handleChange = (index, event) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Ensure only one digit is stored
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus(); // Move to next input if a digit is entered
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);

            if (index > 0) {
                inputRefs.current[index - 1].focus(); // Move back when deleting
            }
        }
    };

    const handleSubmit = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            toast.error("Please enter a 6-digit OTP", { position: "top-center", autoClose: 2000, theme: "dark" });
            return;
        }

        console.log("Entered OTP:", enteredOtp);

        setIsLoading(true);

        try {
            const response = await fetch('https://vtube-backend.onrender.com/api/v1/auth/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, otp: enteredOtp })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Account created successfully!", { position: "top-center", autoClose: 2000, theme: "dark" });
                localStorage.setItem('authToken', data.token);
                setisLogin(true); 

                setTimeout(async () => {
                    try {
                        await fetch("https://vtube-backend.onrender.com/api/v1/auth/user/logout", {
                            method: "GET",
                            credentials: "include",
                        });
                    } catch (error) {
                        console.error("Logout failed:", error);
                    }

                    setisLogin(false);
                    navigate("/login");
                }, 2000);
                 // Delay navigation so the user sees the toast
                
                return;  // 🔴 Stops further execution so no error toast appears
            }

            // Handle incorrect OTP case
            toast.error(data.message || "Incorrect OTP", { position: "top-center", autoClose: 2000, theme: "dark" });

        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('An error occurred during signup', { position: "top-center", autoClose: 2000, theme: "dark" });
        }finally{
            setIsLoading(false);
        }
    }

    return isLoading ? (  
        <div className="flex items-center justify-center h-screen">
      <Lottie animationData={Spinner} className="h-44" />
     </div>
       ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h2>
                <div className="flex space-x-4 mb-6 justify-center">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(event) => handleChange(index, event)}
                            onKeyDown={(event) => handleKeyDown(index, event)}
                            className="w-12 h-12 rounded-md bg-gray-700 text-white text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition duration-300"
                    onClick={handleSubmit}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default OTPpage;

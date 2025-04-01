import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BASE_URL;


const SignupForm = ({ setisLogin ,setIsLoading}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '',
    createPassword: '',
    confirmPassword: ''
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.createPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'dark'
      });
      return;
    }

    setIsLoading(true); // show the loader while Processing

    try {
      const otpResponse = await fetch(`${BASE_URL}/api/v1/auth/user/sendOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });

      if (!otpResponse.ok) {
        toast.error('Error sending OTP', {
          position: 'top-center',
          autoClose: 2000,
          theme: 'dark'
        });
        return;
      }

      // Navigate to OTP page with correct form data
      navigate('/otpverify', { state: formData });
    } catch (error) {
      console.error('OTP request failed:', error);
      toast.error('Failed to send OTP', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'dark'
      });
    }finally {
      setIsLoading(false); // Hide loader after processing
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col items-center justify-center w-full gap-y-4 mt-6">
      <label className="w-full">
        <p className="text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]">
          First Name <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type="text"
          name="firstName"
          onChange={changeHandler}
          placeholder="Enter First Name"
          value={formData.firstName}
          className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
        />
      </label>

      <label className="w-full">
        <p className="text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]">
          Last Name <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type="text"
          name="lastName" 
          onChange={changeHandler}
          placeholder="Enter Last Name"
          value={formData.lastName}
          className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
        />
      </label>

      <label className="w-full">
        <p className="text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          onChange={changeHandler}
          placeholder="Enter Email Address"
          value={formData.email}
          className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]">
          Create Password <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          name="createPassword"
          onChange={changeHandler}
          placeholder="Enter Password"
          value={formData.createPassword}
          className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
        />
        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] cursor-pointer">
          {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
        </span>
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]">
          Confirm Password <sup className="text-pink-600">*</sup>
        </p>
        <input
          required
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          onChange={changeHandler}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
        />
        <span
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
        </span>
      </label>

      <button className="bg-yellow-400 py-[8px] w-full rounded-[8px] font-medium text-gray-950">
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;

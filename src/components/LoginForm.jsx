import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const LoginForm = ({setisLogin}) => {

    // helps to navigate from one page to another page
    const navigate = useNavigate();

    const[showPassword,setshowPassword] = useState(false);

    const[formData,setFormData] = useState(
        {
            email:"",password:""
        }
    )   
    
    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    
    }

    // function submitHandler(event){
    //      event.preventDefault();
    //      setisLogin(true);
    //      toast.success("Logged In");
    //      console.log(formData);
    //      navigate("/dashboard");
    // }

    async function submitHandler(event) {
        event.preventDefault(); // Prevents page reload
        console.log(formData)
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify(formData), // to convert the Javaccript onject to JSON formate
                credentials: 'include' // Allows cookies to be sent for authentication
            });
             
            const data = await response.json();
            
            console.log("This is My data after Login",data);
    
            if (response.ok) {
                toast.success("Logged In Successfully");
                setisLogin(true);
    
                // Store token in localStorage
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userDetail', JSON.stringify(data.user));
                }
    
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                toast.error(data.message || "Login Failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Something went wrong. Please try again.");
        }
    }
    

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col items-center justify-center w-full gap-y-4 mt-6"
     >
       
        <label className='w-full'>
            <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                Email Address<sup className="text-pink-600">*</sup>
            </p>
        
            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
                className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                Password<sup className="text-pink-600">*</sup>
            </p>
        
            <input
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
            />
                           
                           {/* it tells that previous jo bhi value he use ulta kar do(Togles between true and false) */}
            <span onClick={()=>setshowPassword( (prev)=> !prev )} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>
        </label>

        <button className="bg-yellow-400 py-[8px] w-full rounded-[8px] font-medium text-gray-950">Sign In</button>
     </form>
  )
}

import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const SignupForm = ({setisLogin}) => {

    const[showPassword,setshowPassword] = useState(false);
    const[showConfrmPassword,setshowConfrmPassword] = useState(false);

    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    function submitHandler(event){
      event.preventDefault();
      if(formData.password != formData.confirmPassword){
        toast.error("Password do not match" ,{position: "top-center" , autoClose: 2000 , theme: "dark"});
        return;
      }

      setisLogin(true);
      toast.success("Account created" ,{position: "top-center" , autoClose: 2000 , theme: "dark"});
      navigate("/dashboard");


    }


  return (
     
    <form onSubmit={submitHandler}
        className="flex flex-col items-center justify-center w-full gap-y-4 mt-6"
        >
          
                <label className='w-full'>
                  <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                      First Name
                     <sup className="text-pink-600">*</sup>
                  </p>

                  <input
                    required
                    type='text'
                    name='firstname'
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    value={formData.firstname}
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                 />
                </label>

                <label className='w-full'>
                      <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                         Last Name<sup className="text-pink-600">*</sup>
                      </p>

                   <input
                    required
                    type='text'
                    name='lastname'
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    value={formData.lastname}
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                 />
                </label>
          

            <label className='w-full'>
                    <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                        Email Address<sup className="text-pink-600">*</sup>
                    </p>

                   <input
                    required
                    type='email'
                    name='email'
                    onChange={changeHandler}
                    placeholder='Enter Email Address'
                    value={formData.email}
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                 />
            </label>

            
                 <label className='w-full relative'>
                        <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                           Create Password<sup className="text-pink-600">*</sup>
                        </p>

                   <input
                    required
                    type={showPassword ? ('text') : ('password')}
                    name='password'
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    value={formData.password}
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                  />
                        <span onClick={()=>setshowPassword( (prev)=> !prev )} className='absolute right-3 top-[38px] cursor-pointer'>
                                  {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                 </label>

                 <label className='w-full relative'>
                       <p className='text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]'>
                          Confirm Password<sup className="text-pink-600">*</sup>
                       </p>
                       
                   <input
                    required
                    type={showConfrmPassword ? ('text') : ('password')}
                    name='confirmPassword'
                    onChange={changeHandler}
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                  />
                        <span onClick={()=>setshowConfrmPassword( (prev)=> !prev )} className='absolute right-3 top-[38px] cursor-pointer'>
                                  {showConfrmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                 </label>
            
            <button className="bg-yellow-400 py-[8px] w-full rounded-[8px] font-medium text-gray-950">Create Account</button>
        </form>
  )
}

export default SignupForm
import React, { useState } from 'react'
// used for the waking Aanimation
import Lottie from "lottie-react";
import walk from '../assets/walk.json'
import SignupForm from '../components/SignupForm';
import { LoginForm } from '../components/LoginForm';
import { FcGoogle } from "react-icons/fc";
import Spinner from "../assets/LoderSpin.json";




const TemplateLoginSignup = ({formtype,setisLogin,setsearchBar}) => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={Spinner} className="h-44" />
    </div>
   ) : (
    <div className='flex-row py-12 sm:flex sm:items-center sm:justify-center sm:py-12 sm:max-auto sm:gap-12 sm:gap-y-0 '>


        <div className='mx-8'>

            <div>
                  { formtype === "signup" ? 
                  (<h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>Welcome To Signup Page</h1>):
                  (<h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>Welcome To Login Page</h1>)
                   }
            </div>

                {formtype === "signup" ? 
                 (<SignupForm setisLogin={setisLogin}  setIsLoading={setIsLoading}/>):
                 (<LoginForm setisLogin={setisLogin}/>)
                }

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className="h-[1px] w-full bg-gray-700"></div>
                    <p className="text-gray-700 font-medium leading-[1.375rem]">OR</p>
                    <div className="h-[1px] w-full bg-gray-700"></div>
                </div>

                <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
                     <FcGoogle />
                     <p className='text-gray-400'>Sign Up with Google</p>
                 </button>
        </div>
   
             <div className='sm:w-2/5 bg-slate-950'>
                   <Lottie animationData={walk} />
             </div>
    </div>
  )
}

export default TemplateLoginSignup
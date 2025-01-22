import React from 'react'
// used for the waking Aanimation
import Lottie from "lottie-react";
import walk from '../assets/walk.json'
import SignupForm from '../components/SignupForm';
import { LoginForm } from '../components/LoginForm';


const TemplateLoginSignup = ({formtype}) => {
  return (
    <div>
        <div>
                 {formtype === "signup" ? 
                 (<SignupForm/>):
                 (<LoginForm/>)
                }

                <div>
                    <div></div>
                    <p>OR</p>
                    <div></div>
                </div>

                <button>
                    <p>Sign Up with google</p>
                </button>
        </div>
   
             <div className='sm:w-2/5 bg-gray-500'>
                   <Lottie animationData={walk} />
             </div>
    </div>
  )
}

export default TemplateLoginSignup
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const LoginForm = () => {

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

  return (
    <form>
        <label>
            <p>
                Email Address<sup>*</sup>
            </p>
        
            <input
                required
                type='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
            />
        </label>

        <label>
            <p>
                Password<sup>*</sup>
            </p>
        
            <input
                required
                type={showPassword ? ("text") : ("password")}
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
            />
                           
                           {/* it tells that previous jo bhi value he use ulta kar do(Togles between true and false) */}
            <span onClick={()=>setshowPassword( (prev)=> !prev )}>
                {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
            </span>
        </label>

        <button>Sign In</button>
     </form>
  )
}

import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const SignupForm = () => {

    const[showPassword,setshowPassword] = useState(false);

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


  return (
     <div>
        <form>
          <div>
                <label>
                  <p>First Name<sup>*</sup></p>
                  <input
                    required
                    type='text'
                    name='firstname'
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    value={formData.firstname}
                 />
                </label>

                <label>
                  <p>Last Name<sup>*</sup></p>
                   <input
                    required
                    type='text'
                    name='lastname'
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    value={formData.lastname}
                 />
                </label>
          </div>

            <label>
                  <p>Email Address<sup>*</sup></p>
                   <input
                    required
                    type='email'
                    name='email'
                    onChange={changeHandler}
                    placeholder='Enter Email Address'
                    value={formData.email}
                 />
            </label>

            <div>
                 <label>
                  <p>Create Password<sup>*</sup></p>
                   <input
                    required
                    type={showPassword ? ('text') : ('password')}
                    name='password'
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    value={formData.password}
                  />
                        <span onClick={()=>setshowPassword( (prev)=> !prev )}>
                                  {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                 </label>

                 <label>
                  <p>Confirm Password<sup>*</sup></p>
                   <input
                    required
                    type={showPassword ? ('text') : ('password')}
                    name='confirmPassword'
                    onChange={changeHandler}
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                  />
                        <span onClick={()=>setshowPassword( (prev)=> !prev )}>
                                  {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                 </label>
            </div>

            <button>Create Account</button>
        </form>
     </div>
  )
}

export default SignupForm
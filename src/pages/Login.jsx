import React from 'react'
// used for the waking Aanimation
import Lottie from "lottie-react";
import walk from '../assets/walk.json'
import TemplateLoginSignup from './TemplateLoginSignup';

const Login = ({setisLogin}) => {
  return (
      <TemplateLoginSignup
        formtype="login"
        setisLogin={setisLogin}
      />
  )
}

export default Login
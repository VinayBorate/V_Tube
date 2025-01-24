import React from 'react'
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
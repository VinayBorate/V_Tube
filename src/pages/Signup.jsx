import React from 'react'
import TemplateLoginSignup from './TemplateLoginSignup'

const Signup = ({ setisLogin}) => {
  return (
    <TemplateLoginSignup
      formtype="signup"
      setisLogin={setisLogin}
    />
  )
}

export default Signup
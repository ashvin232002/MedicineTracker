import React from 'react'
import Template from '../components/Template'
import login_image from  "../assest/login_image.png"

const Login = () => {
  return (
    <Template
    title="Welcome Bacck"
    desc1="Take all Your Medicine Today,Tommorow and Forever.."
    desc2="Medicine To Save Our Life.."
    image={login_image}
    formtype="login"
    />
  )
}

export default Login
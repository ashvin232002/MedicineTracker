import React, { useState } from 'react'
// import { toast } from 'react-hot-toast';
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import  {Link} from "react-router-dom"
import { login}  from  "../services/operations/authAPI"//import
import  {useDispatch}  from  "react-redux";

const LoginForm = () => {
  const navigate  =  useNavigate();
  const [showpassword,setshowPassword] = useState(false);
  const dispatch =  useDispatch();
  const  [formData,setFormData] = useState({
    email:"",
    password:"",
  })

   const  {email,password} = formData;
  function changeHandler(event){
    setFormData((prevData)=>(
         {
            ...prevData,
            [event.target.name] : event.target.value
         }

    ))
  }

  function submitHandler(event){
      event.preventDefault();
      dispatch(login(email,password,navigate)); //try catch 
  }
  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input 
            type="email"
            required
            value={email}
            onChange={changeHandler}
            placeholder='Enter Email Address' 
            name="email"
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '/>
        </label>

        <label className='relative w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                 Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
            type={showpassword ? ("text"):("password")}
            required
            value={password}
            onChange={changeHandler}
            placeholder='Enter Password'
            name="password" 
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '/>

            <span className='absolute right-3 top-[38px] cursor-pointer '
            onClick={()=>setshowPassword((prev)=>!prev)}>
                {showpassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>
            <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-8' >
            Sign In
        </button>
    </form>
  )
}

export default LoginForm
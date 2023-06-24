import React from 'react'
// import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import  frameImage from "../assest/frame.png"
const Template = ({title,desc1,desc2,image,formtype,setIsLoggedIn}) => {
  return (
    <div className='flex justify-between w-11/12 max-w-[1160px] py-32 mx-auto gap-x-12 gap-y-0  '>
        <div className='w-11/12 max-w-[450px]'>
           <h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
           <p className='text-[1.125rem] leading[1.625rem] mt-4'>
            <span className='text-white'>{desc1}</span>
            <br/><span className='text-blue-100 italic'>{desc2}</span>
           </p>

           (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)
        </div>

        <div className='relative w-11/12 max-w-[450px]'>
            <img src ={frameImage}  
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"/>
            
            <img src ={image}  
            alt="Pattern"
            width={558}
            height={490}
            loading="lazy"
            className='absolute -top-0 right-3'/>
        </div>
    </div>
  )
}

export default Template
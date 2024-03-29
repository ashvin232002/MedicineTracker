import React from 'react'
import {AiOutlineEye , AiOutlineEyeInvisible} from "react-icons/ai";
import { useState } from 'react';
import  {toast} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import  {sendOtp, signUp}  from "../services/operations/authAPI"
import  {setSignupData} from  "../slices/authSlice"
import {ACCOUNT_TYPE} from "../utils/constants"
import  Tab from "../components/Tab"
const districtt = ['Select', 'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha (Palanpur)','Bharuch','Bhavnagar','Botad','Chhota Udepur','Dahod',
'Dangs (Ahwa)','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kachchh','Kheda (Nadiad)','Mahisagar',
'Mehsana','Morbi','Narmada (Rajpipla)','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat',
'Surendranagar','Tapi','Vadodara','Valsad']


const SignupForm = () => {

    const  navigate  =  useNavigate();
    const dispatch = useDispatch();
     const {signupData} =  useSelector((state)=>state.auth);
    // console.log("I am Printing SignUp data after extracting from  auth Slice",signupData)
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.ADMIN)


    const [showpassword,setshowPassword] = useState(false);
    const  [formData,setFormData] = useState({
      fullname:"",
      username:"",
      password:"",
      phone:"",
      email:"",
      shopname:"",
      shopaddress:"",
      district:"",
      pincode:"",
      features:"",
    })
  
    const {fullname ,username , password ,  email ,phone ,shopaddress,shopname,district ,pincode ,features } = formData;
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
          //setIsLoggedIn(true);
          //toast.success("Account created");
          const  realData  =  {
            ...formData,
            accountType
          }
        //  console.log("Printing Account Data");
        //  console.log(realData);
          //console.log("I am Printing The Data WHICH IS STORE IN THE AUTHSLICE",signupData);
          dispatch(setSignupData(realData));
          console.log("I am Printing The data after the setting the signUpdata in AUTH SLICE",signupData);
        //  console.log("Printing The dispatched set signup Data",setSignupData);
          dispatch(sendOtp(formData.email,navigate));
       
          //Reset
          setFormData({
            fullname:"",
            username:"",
            password:"",
            phone:"",
            shopaddress:"",
            shopname:"",
            features:"",
            district:"",
            pincode:"",
            email:""
          })
          setAccountType(ACCOUNT_TYPE.ADMIN);
    }

    const tabData = [
        {
          id: 1,
          tabName: "Admin",
          type: ACCOUNT_TYPE.ADMIN,
        },
      ]
  return (
    <div className='flex flex-col justify-center items-center mx-auto w-11/12 max-w-maxcontent'>
        <p className=' text-white text-[40px]  text-center mt-6 mb-6'>Welcome to <span className='text-blue-500'>Sign Up</span></p>
        <div className="items-center justify-center "><Tab tabData={tabData} field={accountType} setField={setAccountType}  /></div>
        <form onSubmit={submitHandler}>
            <div className='flex items-center gap-60 mx-auto justify-center'>
                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Full Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type="text"
                    required
                    value={fullname}
                    onChange={changeHandler}
                    placeholder='Enter Your Full Name ' 
                    name="fullname"
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] '/>
                </label>

                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        User Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    type="text"
                    required
                    value={username}
                    onChange={changeHandler}
                    placeholder='Enter Your UserName (Should be Unique) '
                    name="username" 
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5  w-[200%] p-[12px] '/>
                </label>
            </div>

            <div className='flex items-center gap-60 mx-auto justify-center'>
                   <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Password<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type={showpassword ? ("text"):("password")}
                        required
                        value={password}
                        onChange={changeHandler}
                        placeholder='Enter Password '
                        name="password"
                        className='bg-richblack-800 rounded-[0.5rem] w-[200%] text-richblack-5  p-[12px] '/>

                        {/* <span className='absolute left-[1000px] top-[390px] cursor-pointer '
                        onClick={()=>setshowPassword((prev)=>!prev)}>
                            {showpassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span> */}
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Phone Number<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={phone}
                        onChange={changeHandler}
                        placeholder='Enter Phone Number '
                        name="phone"
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] '/>
                    </label>
            </div>
            <div className='flex items-center gap-60 mx-auto justify-center'>
                   <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Email Id<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={email}
                        onChange={changeHandler}
                        placeholder='Enter Email Id '
                        name="email" 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] '/>
                    </label>

                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            ShopName<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={shopname}
                        onChange={changeHandler}
                        placeholder='Enter Shop Name '
                        name="shopname"
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] '/>
                    </label>
            </div>
            <div className=' mx-[638px]'>
                    <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Shop Address<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={shopaddress}
                        onChange={changeHandler}
                        placeholder='Enter Shop Address'
                        name="shopaddress" 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[132%] p-[12px] '/>
                    </label>
            </div>

            <div className='mx-[638px] my-2'>
                <label htmlFor="district" className='text-richblack-5 p-[12px]'>Select A District <sup className='text-pink-200'>*</sup></label>
                <select
                
                   required
                   value={district}
                   onChange={changeHandler}
                   name='district'
                   className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[132%] p-[12px] '>
                    {
                            districtt.map((dis)=>(
                                <option className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '>{dis}</option>
                            ))
                   }
                </select>
            </div>
            <div className=' mx-[638px]'>
                <label >
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Pincode<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={pincode}
                        onChange={changeHandler}
                        placeholder='Enter Pincode'
                        name="pincode" 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[132%] p-[12px] '/>
                </label>
            </div>

            <div className='mx-[638px]'>
                <label htmlFor="">
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Features<sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                        type="text"
                        required
                        value={features}
                        onChange={changeHandler}
                        placeholder='Enter Features'
                        name="features" 
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[132%] p-[12px] '/>
                </label>
            </div>

            <button className='mx-[650px] bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-8 w-[20%]' >
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignupForm
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/constants";
import Tab from "../components/Tab";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CustomerSignup = () => {

    const navigate  = useNavigate();
    const dispatch  =  useDispatch();
    const  {signUp} =  useSelector((state)=>state.auth);

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CUSTOMER);
  const [showpassword,setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email:"",
    password:"",
  });

  function submitHandler(event){
    event.preventDefault();
    console.log("I am Printing The data inside the CustomerSignUp page ",formData);
    const  realData =  {
        ...formData,
        accountType
    }

    console.log("I am Printing The account Data Inside the submit Handler",realData);
    dispatch(setSignupData(realData));

    dispatch(sendOtp(formData.email,navigate));
       
    setFormData({
        fullname:"",
        username:"",
        email:"",
        password:""
    })
    setAccountType(ACCOUNT_TYPE.CUSTOMER);
  }



  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const tabData = [
    {
      id: 1,
      tabName: "Customer",
      type: ACCOUNT_TYPE.CUSTOMER,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mx-auto w-11/12 max-w-maxcontent ml-8">
      <p className=" text-white text-[40px]  text-center mt-6 mb-6">
        Welcome to <span className="text-blue-500">Sign Up</span>
      </p>
      <div className="items-center justify-center ">
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-3 items-center  mx-auto justify-center">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Full Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              value={formData.fullname}
              onChange={changeHandler}
              placeholder="Enter Your Full Name "
              name="fullname"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] "
            />
          </label>

          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              User Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              value={formData.username}
              onChange={changeHandler}
              placeholder="Enter Your UserName (Should be Unique) "
              name="username"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5  w-[200%] p-[12px] "
            />
          </label>
        </div>
        <div className="flex flex-col items-center gap-3 mx-auto justify-center">
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter Your Email"
              name="email"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[200%] p-[12px] "
            />
          </label>

          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showpassword?"text":"password"}
              required
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Your Password"
              name="password"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5  w-[200%] p-[12px] "
            />
            <span className='absolute left-[1170px] top-[405px] cursor-pointer '
                        onClick={()=>setshowPassword((prev)=>!prev)}>
                            {showpassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
          </label>
        </div>
        <button className='mx-[650px] bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-8 w-[20%]' >
                Sign Up
        </button>
      </form>
      
    </div>
  );
};

export default CustomerSignup;

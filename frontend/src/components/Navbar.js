import React,{useEffect} from 'react'
import  logo  from "../assest/logo.png"
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../pages/ProfileDropDown'
// import { apiConnector } from '../services/apiconnector'
// import { useState } from 'react'
// import {IoIosArrowDropdownCircle} from "react-icons/io"
// import { toast } from 'react-hot-toast';

const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const location = useLocation();

    const matchRoute = (route) => {
      return matchPath({path:route}, location.pathname);
    }
  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
        <Link  to="/">
           <img src={logo} alt ={logo}  width={160} height={25} loading="lazy"/>
        </Link>
        <nav >
          <ul className='text-white  flex gap-x-6'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Login-SignUp-LogOut-Dashboard   */}

        <div className='flex items-center gap-x-4'>
        {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                              AdminSignUp
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/Customersignup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            UserSignUp
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
        </div>
    </div>
  )
}

export default Navbar
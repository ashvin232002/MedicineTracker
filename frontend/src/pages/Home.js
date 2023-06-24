import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighLightText'

import CTAButton from "../components/core/HomePage/Button"
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      {/*Section1  */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between mb-[30px]'>

        <Link to={"/signup"}>
            <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Admin</p>
                    <FaArrowRight />
                </div>
            </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-7 font-sans'>
             Use Our Free Delivery 
            <HighlightText className="font-serif" text={"Medicine Service"} />
        </div>

        <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 font-serif'>
            With our Free Delivery Medicine Service , you can get Your Medicine 24/7 , from anywhere in the world, including Delivery Customer-Bussiness perfect Communication. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}> 
                Let's Use it
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}> 
                Let's Login
            </CTAButton>
        </div>

       
      </div>


      {/*Section 2  */}
      <div className='bg-pure-greys-5 text-richblack-700'>
            

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get Your  Medicine
                        <HighlightText text={" With Chipest Price With Multiple Stores"} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    The main Goal of the Medicine Tracker is To provide their customers a Medicine and Admin to their Customers.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                    </div>

                </div>
                
                

                <TimelineSection />

                

            </div>

            

      </div>


      {/*Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white mb-12 mt-32'>

            <InstructorSection />


      </div>


     

        <Footer/>
    </div>
  )
}

export default Home

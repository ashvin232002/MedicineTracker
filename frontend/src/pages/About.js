import React from "react";
import Footer from "./Footer";
import HighlightText from "../components/core/HomePage/HighLightText";
// import MedicineImage1 from "../assest/MedicineImage1.png"
// import MedicineImage2 from "../assest/MedicineImage2.png"
import mediImage from  "../assest/mediImage.png"
import Doctor_image1 from "../assest/Doctor_image1.png";
import Doctor_image2 from "../assest/Doctor_image2.png";
import Doctor_image_3 from "../assest/Doctor_image_3.png";
const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            
            <HighlightText text={"Brighter Facilities"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Medicine Tracker is a helping the people of gujarat to find their 
              appropriate medicine at any time.
               We are always happy to help the needy people .           </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 items-center mx-96">
            <img src={Doctor_image1} alt="" />
            {/* <img src={Doctor_image1} alt="" />/
            <img src={Doctor_image1} alt="" /> */}
          </div>
        </div>
      </section>
      <div className="bg-white ">
        <div className=" w-11/12 max-w-maxContent text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-black font-bold">
          <div className="mt-32">
            We are passionate about revolutionizing the way to find the medicine at or home. Our
            innovative platform <HighlightText text={"combines technology"} />,{" "}
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
              {" "}
              expertise
            </span>
            , and community of Doctors
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
              {" "}
              to help the People of Gujarat.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
        <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
          <div className="my-24 flex lg:w-[50%] flex-col gap-10">
            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
              Our Founding Story
            </h1>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our e platform was born out of a shared vision and
              passion for transforming or delivering or to help the people. It all began with a group of
              Doctors, technologists, and lifelong people who recognized the
              need for accessible, flexible 24/7 service.
            </p>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
            A dedicated pharmacist, created MedicineTracker, a website revolutionizing medicine storage management. 
            With its user-friendly interface and advanced features, MedicineTracker simplifies inventory tracking, 
            expiration date reminders, and storage conditions. Adopted worldwide, it empowers pharmacies and healthcare 
            facilities, making a meaningful impact on medicine management.
            </p>
          </div>

          <div>
            <img
              src={mediImage}
              alt=""
              className="shadow-[0_0_20px_0] shadow-[#FC6767]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
          <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
              Our Vision
            </h1>
            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              With this vision in mind, we set out on a journey to create an
              e platform that would revolutionize the way people Use Our Services.
              Streamline your medicine storage management with our intuitive website,
              empowering you to effortlessly track and monitor your inventory.
            </p>
          </div>
          <div className="my-24 flex lg:w-[40%] flex-col gap-10">
            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
            </h1>

            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering Medicine. We wanted
              to create a vibrant community of Doctors, where individuals store owners
              provide a perfect and Quality medicine , collaborate, and Follow the Terms 
              and conditions of Medicine Tracker  . 
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

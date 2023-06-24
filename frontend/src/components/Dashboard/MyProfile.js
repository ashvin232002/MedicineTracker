import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { formattedDate } from "../../utils/dateFormatter";
import IconBtn from "./IconBtn";
import React from "react";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-white">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.fullname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.fullname + " " + "("+user?.username+")"}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      {/* <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>

      
      </div> */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          {
            user.accountType=="Admin" ?
            (<div>
                <p className="text-lg font-semibold text-richblack-5">
                Shop Details 
              </p>
             </div>):(
              <div>
                 <p className="text-lg font-semibold text-richblack-5">
                User Details
              </p>
              </div>
             )
          }
          
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              {
              user.accountType=="Admin" ? (<div>
                  <p className="mb-2 text-sm text-richblack-600">Shop Name</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.shopname}
                  </p>
              </div>):(<div>
                <p className="mb-2 text-sm text-richblack-600">Full Name</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.fullname}
                  </p>
              </div>)
              }
            </div>
            <div>
              {
              user.accountType=="Admin" ?(<div>
                  <p className="mb-2 text-sm text-richblack-600">Shop Address</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.shopaddress}
                  </p>
              </div>):(
                <div>
                    <p className="mb-2 text-sm text-richblack-600">User Name</p>
                    <p className="text-sm font-medium text-richblack-5">
                      {user?.username}
                    </p>
                </div>
              )
             }
            </div>
            <div>
              {
                user.accountType=="Admin" ?(
              <div>
                  <p className="mb-2 text-sm text-richblack-600">Account Type</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.accountType}
                  </p>
              </div>
                ):(
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Email</p>
                    <p className="text-sm font-medium text-richblack-5">
                      {user?.email}
                    </p>
                </div>)
              }
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              {
                 user.accountType=="Admin" ?(
                <div>
                  <p className="mb-2 text-sm text-richblack-600">District Name</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.district}
                  </p>
              </div>):(<div>
                   <p className="mb-2 text-sm text-richblack-600">Acoount Type</p>
                    <p className="text-sm font-medium text-richblack-5">
                      {user?.accountType}
                    </p>
              </div>)
               }
            </div>
            <div>
              {


                  user.accountType=="Admin" ? (<div><p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.phone}
                  </p>
                  </div>):(
                      <div>
                        </div>
                  )
              }
            </div>
            <div>
              {

                user.accountType=="Admin"?(<div>
                  <p className="mb-2 text-sm text-richblack-600">Features</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user?.features}
                  </p>
                </div>):(<div></div>)
               }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllmedicine } from "../../../services/operations/Medicine";
import { toast } from "react-hot-toast";
import  {useNavigate} from "react-router-dom"
import IconBtn from "../IconBtn";
const Mymedicinee = () => {
  const navigate  = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // console.log("PRINTING THE TOKEN IN THE MY MEDICINE PAGE",token);
  const [usermedicine, setUserMedicine] = useState([]);

  const getMedicineAll = async () => {
    try {
      const response = await getAllmedicine(token);
      setUserMedicine(response);
      console.log(
        "Printing The FETCHED USER MEDICINE IN MY MEDICINE PAGE",
        response
      );
    } catch (error) {
      console.log("Unable Fetch Cources");
    }
  };
  useEffect(() => {
    getMedicineAll();
  }, []);

  return (
    <div className="text-white">
      
      {!usermedicine ? (
        <div>Loading......</div>
      ) : !usermedicine.length ? (
        <p>You Have Not Created any Medicine yet</p>
      ) : (
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12">
          <div className="text-[200%] font-semibold">Medicine Create By Me</div>
          <div className="flex flex-col gap-8">
            {usermedicine.map((value, index) => (
              // <div className="flex flex-col">
              <div>
                <div className="flex flex-col bg-richblack-200 text-black rounded p-8 gap-y-5">
                  <div className="flex text-lg font-bold w-[50%] gap-x-24">
                    Medicine Name <div className=" text-richblack-900 ">{value.name}</div>
                  </div>
                  <div className="flex w-[50%] gap-x-24 font-bold text-lg">
                    Medicine Quant.<div className="text-blue">{value.quantity}</div>
                  </div>

                  
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => {
                      navigate("/dashboard/update-medicine")
                    }}
                    className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
                  >
                    Update Quantity
                  </button>
                  <button
                    onClick={() => {
                      navigate("/dashboard/add-delete-medicine")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-50"
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mymedicinee;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMedicine } from "../../../services/operations/Medicine";
import { deleteMedicine } from "../../../services/operations/Medicine";


const AddDeletemedicine = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });

  const [formData2, setFormData2] = useState({
    name: "",
  });
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function changeHandler2(event){
    setFormData2((prevData)=>({
        ...prevData,
        [event.target.name]: event.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("PRINTING THE FORM DATA INSIDE THE ADDDELETEPAGE", formData);
    dispatch(addMedicine(token, formData,navigate));
  };

  const  handleOnSubmit2 = (e)=>{
    e.preventDefault();
    console.log("PRINTING THE DATA IN TEH DELTE PAGE",formData2);
    dispatch(deleteMedicine(token,formData2,navigate));
  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          My Medicine
        </h1>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Enter The Medicine Name{" "}
          </h2>
          <div className="flex flex-col gap-5 lg-flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label className="text-richblack-5"> Medicine Name</label>
              <input
                type="text"
                required
                value={formData.value}
                name="name"
                onChange={changeHandler}
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                placeholder="Please Enter The Medicine Name"
              />
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label className="text-richblack-5"> Medicine Quantity</label>
              <input
                type="Number"
                required
                value={formData.value}
                name="quantity"
                onChange={changeHandler}
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                placeholder="Please Enter The Medicine Name"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="cursor-pointer  rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-700"
          >
            Add
          </button>
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer  rounded-md bg-richblack-500 py-2 px-5 font-semibold text-richblack-50"
          >
            cancel
          </button>
        </div>
      </form>

      <form onSubmit={handleOnSubmit2}>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          DELETE Medicine
        </h1>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Enter The Medicine Name{" "}
          </h2>
          <div className="flex flex-col gap-5 lg-flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label className="text-richblack-5"> Medicine Name</label>
              <input
                type="text"
                required
                value={formData2.value}
                name="name"
                onChange={changeHandler2}
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                placeholder="Please Enter The Medicine Name"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="cursor-pointer  rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-700"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer  rounded-md bg-richblack-500 py-2 px-5 font-semibold text-richblack-50"
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDeletemedicine;

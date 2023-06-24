import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMedicineFindedByUser } from "../../../services/operations/Medicine";
const districtt = [
  "Select",
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha (Palanpur)",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udepur",
  "Dahod",
  "Dangs (Ahwa)",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kachchh",
  "Kheda (Nadiad)",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada (Rajpipla)",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad",
];

const SearchMedicine = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [response1, setResponse1] = useState([]);
  const [ans, setAns] = useState([]);
  let response2 = [];
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setFlag(true);
    // console.log("I am printing response in submit",response1);
    for (let i = 0; i < response1.length; i++) {
      let object = response1[i];
      if (
        object.name === formData.name &&
        object.district === formData.district
      ) {
        response2.push(object);
      }
    }
    setAns(response2);
    console.log("I am Printing response 2", response2);
  };

  const getMedicine = async () => {
    try {
      const response = await getAllMedicineFindedByUser(token);
      // console.log(
      //   "Printing The FETCHED USER MEDICINE IN MY MEDICINE PAGE",
      //   response
      // );
      setResponse1(response);
    } catch (error) {
      console.log("Unable Fetch Medicine");
    }
  };
  useEffect(() => {
    getMedicine();
  }, []);
  return (
    <>
      {!flag ? (
        <form onSubmit={handleOnSubmit}>
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Find Your Medicine
          </h1>
          <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12 ">
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
                <label
                  htmlFor="district"
                  className="text-richblack-5 p-[12px] "
                >
                  Select A District <sup className="text-pink-200">*</sup>
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={changeHandler}
                  name="district"
                  className="bg-richblack-600 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                >
                  {districtt.map((dis) => (
                    <option className="bg-richblack-600 rounded-[0.5rem] text-richblack-5 w-full p-[12px] ">
                      {dis}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="cursor-pointer  rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-700"
            >
              Find
            </button>
            <button
              onClick={() => navigate("/dashboard/my-profile")}
              className="cursor-pointer  rounded-md bg-richblack-500 py-2 px-5 font-semibold text-richblack-50"
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-8 px-12">
            <div className="text-[200%] font-semibold text-white">
              <h1 className="text-yellow-50">Available Medical Stores in Your District</h1>
            </div>
            <div className="flex flex-col gap-8 text-white">

              
              {ans.map((user, index) => (
                <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-100 p-8 px-12">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-900 flex gap-3 text-bold">
                      Shop Details for <div className="text-blue-300">{user?.name} </div>
                    </p>
                  </div>
                  <div className="flex max-w-[500px] justify-between font-semibold ">
                    <div className="flex flex-col gap-y-5">
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Shop Name
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.shopname}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Shop Address
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.shopaddress}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          District
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.district}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Awailabale Quantity
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Shop Owner Name / (username)
                        </p>
                        <p className="text-sm font-medium text-richblack-900 ">
                          {user?.fullname } {"( "}
                          {user?.username}{" ) "}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Email Address
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Phone No(+91)
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.phone}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm text-blue-300">
                          Features
                        </p>
                        <p className="text-sm font-medium text-richblack-900">
                          {user?.features}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {ans.length===0 ? (<div className="items-center text-yellow-50 justify-center mx-auto">No User Found For this Medicine Name</div>):(<div></div>)}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchMedicine;

import {toast}  from "react-hot-toast"

// import {setLoading, setToken}  from "../../slices/authSlice"
// import { setUser } from "../../slices/profileSlice"
import { apiConnecter } from "../apiconnector"
import  {medicineEndpoints}  from "../apis"



const {
    ADD_MEDICINE,
    DELETE_MEDICINE,
    GET_ALL_USER_MEDICINE,
    UPDATE_QUANTITY_OF_MEDICINE,
    GET_ALL_MEDICINE_FROM_DATABASE
}= medicineEndpoints



export function addMedicine(token,formData,navigate){
    return async (dispatch)=>{
        const  toastId  =  toast.loading("Loading...");
        try{
            const  response =  await apiConnecter("POST",ADD_MEDICINE,formData,{
                Authorization: `Bearer ${token}`
            })

            console.log("CREATED MEDICINE API RESPONSE",response);
            if(!response.data.success){
                throw new Error (response.data.message);
            }
            toast.success("Medicine Addded SuccessFully");
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("ADD MEDICINE API ERROR........",error);
            toast.error("Medicine Could not created")
        }
        toast.dismiss(toastId);
    }
}

export  function deleteMedicine (token,formData2){
       return async (dispatch)=>{
           const  toastId  =  toast.loading("Loading.....");
           try{
               const  response  =  await apiConnecter("DELETE",DELETE_MEDICINE,formData2,{
                Authorization: `Bearer ${token}`
               })

               console.log("DELETE MEDICINE API RESONSE",response);
               if(!response.data.success){
                     throw new Error(response.data.message);
               }
               toast.success("Medicine Delete SuccessFully");
           }
           catch(error){
                  console.log("DELETE MEDICINE API ERROR......",error);
                  toast.error("Medicine Could Not Deleted");
           }
           toast.dismiss(toastId);
       }
}


export function updateQuantityMedicine(token,formdata){
    return async (dispatch)=>{
        const  toastId  =  toast.loading("Loading....");
        try{
             const  response  =   await apiConnecter("PUT",UPDATE_QUANTITY_OF_MEDICINE,formdata,{
                Authorization: `Bearer ${token}`
               });


               console.log("UPDATE QUANTITY MEDICINE API RESPONSE",response);
               if(!response.data.success){
                throw new Error(response.data.message);
               }
               toast.success("Medicine Quantity would BE SuccessFully Updated");
        }
        catch(error){
            console.log("ERROR WHILE UPDATINT THE MEDICINE QUANTITY API ERRRO......",error);
            toast.error("Medicine Could Not Updated ");
        }
        toast.dismiss(toastId);
    }
}


export  async function getAllmedicine(token){
        const toastId  =  toast.loading("Loading....");
        let  result = [];
        try{
            console.log("BEFORE CALLING The GETALL Medicine api");
              const  response =  await apiConnecter(
                "GET",
                GET_ALL_USER_MEDICINE,
                null,
                {
                  Authorization: `Bearer ${token}`,
                }
              )

            //   console.log("AFTER CALLING THE GET ALL USER MEDICINE API",response.data.AllMedicineCreatedByUser
            //   );

              if(!response.data.success){
                throw new Error(response.data.message);
              }
              result  = response.data.AllMedicineCreatedByUser
              ;
              
               //console.log("PRINTING THE RESULT ARRAY",result);

        }
        catch(error){
            console.log("GET_ALL_MEDICINE_API RESPONSE ERROR",error);
            toast.error("Could Not Get Medicine Please Try Again Later ")
        }
        toast.dismiss(toastId);
        return result;
    }

  
export async function getAllMedicineFindedByUser(token){
    const  toastId  =  toast.loading("Loading...");
    let ans = [];
    try{
         console.log("Before Calling The get ALL medicine By User API ");
         console.log("Name");
         const  response =  await apiConnecter(
            "GET",
            GET_ALL_MEDICINE_FROM_DATABASE,
            null,
            {
              Authorization: `Bearer ${token}`,
            }
          )
        console.log("AFTER CALLING THE API",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log(response);
        ans=response.data.data;
    }
    catch(error){
        console.log("FINDING THE USERS ERROR",error);
        toast.error("Error While Finding The Availbale Users")
    }
    toast.dismiss(toastId);
    return ans;
}
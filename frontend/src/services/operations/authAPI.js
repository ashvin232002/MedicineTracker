import {toast}  from "react-hot-toast"

import {setLoading, setToken}  from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnecter } from "../apiconnector"//
import { endpoints } from "../apis"//



const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    CUSTOMER_SIGNUP_API
} = endpoints

export  function sendOtp(email,navigate){
    return async(dispatch)=>{
        const  toastId   =  toast.loading("Loading..");
        dispatch(setLoading(true));
        try{
            const response  = await apiConnecter("POST",SENDOTP_API,{
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE>....",response);
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export  function CustomerSignUp(
    accountType,
    email,
    password,
    fullname,
    username,
    otp,
    navigate
){
    return async (dispatch)=>{
        const toastId  =  toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            console.log("Before Calling The CUSTOMER SIGNUP API ");
            const  response  =  await apiConnecter("POST",CUSTOMER_SIGNUP_API,{
                accountType,
                email,
                password,
                fullname,
                username,
                otp
            })

            console.log("SIGN API CALLED IN SIDE CUSTOMER SIGN U P",response);
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error){
            console.log("CUSTOMER API ERROR");
            toast.error("User signUp failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp(
            accountType,
            fullname,
            username,
            password,
            shopname,
            shopaddress,
            features,
            district,
            email,
            phone,
            pincode,
            otp,
            navigate
){
    return async (dispatch)=>{
        const toastId  =  toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const  response =  await apiConnecter("POST",SIGNUP_API,{
                accountType,
                fullname,
                username,
                password,
                shopname,
                shopaddress,
                features,
                district,
                email,
                phone,
                pincode,
                otp,
            })

            console.log("SIGNUP API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Signup Successful")
              navigate("/login")
        }catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnecter("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {//
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  




export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}


export function getPasswordResetToken(email,setEmailSent){
    return async (dispatch) =>{
        dispatch(setLoading(true));
        try{
            const  response  =  await apiConnecter("POST",RESETPASSTOKEN_API,{email});
            console.log("RESET PASSWORD TOKEN RESPONSE.....",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
             toast.success("Reset Email Sent");
             setEmailSent(true);
        }catch(error){
            console.log("RESET PASSWORD TOKEN ERROR",error);
            toast.error("Failed To sent Email for Resetting password");
        }
        dispatch(setLoading(false));
    }
}


export  function resetPassword(password,token){
    return async(dispatch)=>{
       dispatch(setLoading(true));
       try{
        const  response  = await apiConnecter("POST",RESETPASSWORD_API,{password,token});
        console.log("RESET password RESPOnse....",response);

        if(!response.data.success){
            throw  new Error(response.data.message);
        }
        toast.success("Password has been Reset SuccessFullly");
       }
       catch(error){
           console.log("RESET PASSWORD tOEKN eRROR",error);
           toast.error("Unable to reset Password");
       }
       dispatch(setLoading(false));
    }
}
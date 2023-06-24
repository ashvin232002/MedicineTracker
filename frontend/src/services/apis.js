const  BASE_URL =  process.env.REACT_APP_BASE_URL //             http://4000/api/v1

//Auth Endpoints
export  const  endpoints  =  {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
    CUSTOMER_SIGNUP_API : BASE_URL + "/auth/CustomerSignup"
}


//Profile EndPoints
export  const  profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
}


export  const  settingsEndpoints  =  {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteProfile",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
}

export  const  medicineEndpoints  =  {
    ADD_MEDICINE : BASE_URL + "/medicine/createMedicine",
    DELETE_MEDICINE: BASE_URL + "/medicine/medicineDelete",
    GET_ALL_USER_MEDICINE: BASE_URL +"/medicine/medicineCreatedByuser",
    UPDATE_QUANTITY_OF_MEDICINE : BASE_URL +  "/medicine/updateQuantityMedicine",
    GET_ALL_MEDICINE_FROM_DATABASE: BASE_URL + "/medicine/getAllMedicineFromDatabase",
}
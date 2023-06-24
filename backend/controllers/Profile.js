const  Profile = require("../models/Profile");
const User  =  require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile =  async (req,res)=>{
    try{
         //get Data 
        const {dateOfBirth,about,gender}  = req.body;
         //get userID
         const  id =  req.user.id;
         //validation
         
         //find Profile
         const  userDetails  =  await User.findById(id);
         const profileId  =  userDetails.additionalDetails;
         const profileDetails  =  await Profile.findById(profileId);
         //update Profile
         //profileDetails.dateOfBirth =  dateOfBirth;
         profileDetails.about = about;
         //profileDetails.gender =  gender;
         await profileDetails.save();
         //return response
         return res.status(200).json({
            success:true,
            message:"Profile Created SuccessFully",
            profileDetails,
         })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Updating THE Profile"
        })
    }
}



exports.deleteAccount  =  async (req,res)=>{
    try{
       //get id  
       const id  =  req.user.id;
       //validation
       const userDetails =  await User.findById(id);
       if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"User Not found"
        })
       }

       //delete Profile
       await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

       //delete User 
       await User.findByIdAndDelete({_id:id});

       //return response
       return  res.status(200).json({
        success:true,
        message:"User Deleted SuccessFullly",
       })
    }
    catch(error){
       return  res.status(400).json({
        success:false,
        message:"Error while Deleting The user ",
       })
    }
}



exports.getAllUserDetails = async (req,res)=>{
    try{
        //get id  
        const  id  =  req.user.id;
        //validation and get user Details
        const  userDetails  = await User.findById(id).populate("additionalDetails").exec();

        //return response
        return res.status(200).json({
            success:true,
            userDetails,
            message:"Got all user Details SucccessFully"
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            
            message:"Error While fetching the User Details"
        })
    }
}



exports.updateDisplayPicture   = async (req,res)=>{
    try{
        const  displayPicture  =  req.files.displayPicture;
        const  userId  =  req.user.id;

        const  image =  await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
          )
          res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.getAllUserMedicine =  async (req,res)=>{
    try{
       const  userId  =  req.user.id;

       const userDetails   = await User.findOne({_id:userId}).populate("medicine").exec();

       if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Cound Not find User:"
        })
       }

       return res.status(200).json({
        success:true,
        data:userDetails.medicine,
       })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}
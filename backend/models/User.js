const mongoose = require("mongoose");

const  user  =  new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        // required:true
    },
    phone:{
        type:String,
        //required:true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    image: {
        type: String, 
        // required: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    shopname:{
        type:String,
        //required:true,
        trim:true,
    },
    shopaddress:{
        type:String,
        //required:true,
    },
    district:{
        type:String,
        //required:true,
    },
    pincode:{
        type:String,
        //required:true,
    },
    features:{
        type:String,
        //required:true,
    },
    medicine:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Medicine",
        }
    ],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Customer"],
        required: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
});

module.exports =  mongoose.model("User",user);
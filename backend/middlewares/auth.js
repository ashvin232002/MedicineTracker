const  jwt  =  require("jsonwebtoken");
require("dotenv").config();
const  User  =  require("../models/User");


//auth
exports.auth =  async (req,res,next)=>{
    try{
        
        // console.log("BEFORE THE TOKEN EXTRACTION IN THE AUTH MIDDLEWARE")
        // // extract token
        // console.log("REQ.COOKIES.TOKEN",req.cookies.token);
        // console.log("REQ.BODY.TOKEN",req.body.token);
        // console.log("Bearer Token",req.header("Authorization").replace("Bearer ", ""));
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        // console.log("AFTER ToKEN EXTRACTION");

        // console.log("AFTER TOKE  EXTRACTION",token);
        // if token missing then return response 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Not Found",
            })
        }

        //verify The token
        try{
            const  decode   =   jwt.verify(token,process.env.JWT_SECRET);
            // console.log("PRINTING THE DECODE IN the AUth mIDDLEware",decode);
            req.user =  decode;
        }
        catch(error){
             return res.status(401).json({
                success:false,
                message:"Token is Invalid",
             })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
         })
    }
}

exports.isCustomer =  async (req,res,next)=>{
    try{
        console.log("I am Inside The icCustomer Middleware",req.user.accountType);
        if(req.user.accountType !== "Customer"){
            return res.status(401).json({
                success:false,
                message:'This is The Protected Route for Customers Only'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role can Not BE Verified Please Try Again'
        })
    }
}


// isAdmin

exports.isAdmin  =  async (req,res,next)=>{
    try{
         console.log("Printing The AccountType in THe Auth Middleware ",req.user.accountType);
         if(req.user.accountType!== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for the Admin Only "
            })
         }
         next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role can Not Be Verified ,Please Try Again Later ',
        })
    }
}



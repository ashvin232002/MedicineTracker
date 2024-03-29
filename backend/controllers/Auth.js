
//importing bcrypt library 
const bcrypt = require("bcrypt");

//to perform operation importing model
const User = require("../models/User");
const OTP =  require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator  = require("otp-generator");
const  mailSender  =  require("../utils/mailSender");
const  {passwordUpdated} = require("../mail/templates/passwordUpdated");
const Profile = require("../models/Profile");

//importing .env file
require("dotenv").config();


//send OTP
// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		//defining the otp functionality
		//otp len =6
		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});


		const result = await OTP.findOne({ otp: otp });
		// console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};


exports.CustomerSignup =  async (req,res)=>{
  try{
      const{
        fullname,
        username,
        email,
        password,
        otp,
        accountType,
      }  = req.body;


      if(!fullname || !username || !password || !email || !otp || !accountType){
        return res.status(400).json({
          success:false,
          message:"Please all the details Carefully"
        })
      }

      const  existingUser  = await User.findOne({email:email});

      if(existingUser){
        return res.status(400).json({
          success:false,
          message: "User already Registered",
        })
      }

           //find The most recent OTP 
          // console.log(req.body);
          const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
          console.log(response);
          if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          }

             let hashedPassword ;
             try{
              hashedPassword =  await bcrypt.hash(password,10);
             }catch(error){
              return res.status(400).json({
                success:false,
                message:"Error while creating hashed password "
              })
             }
         
             console.log("OTP IS",response[0].otp);
             console.log("Hashed Pass is",hashedPassword);
             //Create The User 
             let approved = "";
             approved === "Admin" ? (approved=false):(approved=true);
           
   
             const  profileDetails =  await Profile.create({
              gender:null,
              dateOfBirth:null,
              about:null,
             })

             const  user  = await User.create({
              fullname:fullname,
              username:username,
              password:hashedPassword,
              //phone:phone,
              email:email,
              // shopname:shopname,
              // shopaddress:shopaddress,
              // district:district,
              // pincode:pincode,
              // features:features,
              accountType:accountType,
              approved:approved,
              image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullname} ${username}`,
              additionalDetails:profileDetails._id,
            });
  
  
             console.log(user);
            res.status(200).json({
              success:true,
              user,
              message:"User Created SuccessFully",
            })
  
  }
  catch(error){
    return res.status(400).json({
      success:false,
      message:"Error while Customer Sign Up"
    })
  }
}


exports.signup =  async (req,res)=>{
    //fetching the data from Req Body
    try{
       const {
        fullname,
        username,
        password,
        phone,
        email,
        shopname,
        shopaddress,
        district,
        pincode,
        features,
        otp,
        accountType
       } = req.body;

        console.log("Presenting the Backend Data",req.body);
       //validation On data 
       if(!otp || !fullname || !password || !username || !phone || !email || !shopname
          || !shopaddress || !district || !pincode || !features || !accountType){
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required",
            })
          }


          //check if user Already Exist
          const  existingUser  =  await User.findOne({email});
          if(existingUser){
            return res.status(400).json({
                success:false,
                message:"This Email  Id is Already Registered"
            })
          }

          //find The most recent OTP 
          // console.log(req.body);
          const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
          console.log(response);
          if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          }



          //creating Encrypted Password
          //Here We are Using Bcrypt Library to hash The password 
          let hashedPassword ;
          try {
            hashedPassword = await bcrypt.hash(password, 10);
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: "Error while Hashing Password",
            });
          }


          console.log("OTP IS",response[0].otp);
          console.log("Hashed Pass is",hashedPassword);
          //Create The User 
          let approved = "";
          approved === "Admin" ? (approved=false):(approved=true);
        

          // console.log("approved",approved);
        //   console.log(hashedPassword2);
        //create The Additional Profile For The user
           const  profileDetails =  await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:phone,
            shopaddress:shopaddress,
            shopname:shopname,
            district:district,
           })

            console.log(profileDetails);
          //creating The Entry Into The DB

          // console.log(username);
          // console.log(fullname);
          // console.log(hashedPassword);
          // console.log(phone);
          // console.log(email);
          // console.log(shopname);
          // console.log(shopaddress);
          // console.log(district);
          // console.log(pincode);
          // console.log(features);
          // console.log(accountType);
          // console.log(approved);
          // console.log(profileDetails._id);
          const  user  = await User.create({
            fullname:fullname,
            username:username,
            password:hashedPassword,
            phone:phone,
            email:email,
            shopname:shopname,
            shopaddress:shopaddress,
            district:district,
            pincode:pincode,
            features:features,
            accountType:accountType,
            approved:approved,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullname} ${username}`,
            additionalDetails:profileDetails._id,
          });


           console.log(user);
          res.status(200).json({
            success:true,
            user,
            message:"User Created SuccessFully",
          })
    }
    catch(error){
         return res.status(500).json({
            success:false,
            message:"Errro While Creating The User ",
         })
    }
}



exports.login =  async  (req,res)=>{
    //fetching the data 

    try{
        const  {email ,password} =  req.body ;

        //make Validation The data 
        if(!email  || !password){
            return res.status(400).json({
                success:false,
                message:"All The Data Should Be Required ",
            })
        }

        //finding The user With This Email and checking Weather The user Exist or Not 
        let  user   = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user Not Registered",
            })
        }

        //verify password and generate a JWT token (jsonwebToken)
        //jwt (payload,secreat Key ,Header)
        


        /*//just for debugging
        // console.log(user);
        // console.log(password);
        // if(await bcrypt.compare(password,user.password)){
        //     console.log("password match");
        // }else{
        //    console.log("password not matches");
        // }*/


        //compare the CurrentPassword and User password Check weather it  is matches or not 
        if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id , accountType: user.accountType},
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			// console.log(user);
			user.token = token;
			// console.log(user);
			user.password = undefined;
			// console.log(user);
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
            // console.log(error);
            return res.status(401).json({
              success: false,
              message: `Password is incorrect`,
            });
        }
    }
    catch(error){
      console.log(error);
        return  res.status(400).json({
            success:false,
            message:"Error While Login",
        })
    }
}



// changepassword
exports.changePassword  =  async (req,res)=>{
  try{
    //get all data from req.user
    const userDetails  =  await User.findById(req.user.id);

    //get old password and new password
    const {oldPassword ,newPassword} =  req.body;

    if(!oldPassword || !newPassword){
      return res.status(400).json({
        success:false,
        message:"All the details are Required",
      })
    }

    const  isPasswordMatch =  await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    console.log("Printing The isPassword match in ",isPasswordMatch);
    if(!isPasswordMatch){
      return   res.status(400).json({
        success:false,
        message:'Password Not Mached Please Try again'
      })
    }

    const  encryptedPassword =  await bcrypt.hash(newPassword,10);
    console.log(encryptedPassword);
    const  updatedUserDetails  = await User.findByIdAndUpdate(
      {_id:req.user.id},
      {password:encryptedPassword},
      {new:true}
    );
    console.log(updatedUserDetails);
    // Send notification email
		try {
      
			const emailResponse = await mailSender(
				updatedUserDetails.email,
        "Password Updated SuccessFully",
				passwordUpdated(
					updatedUserDetails.email,
				  updatedUserDetails.username
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

    //return the success Response
    return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
  }
  catch(error){
    console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
  }
}
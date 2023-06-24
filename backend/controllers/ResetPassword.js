const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const  bcrypt =  require("bcrypt");
const  crypto =  require("crypto");

//reset Password Token

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}

		//crpto basically generat the random token
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		//console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
            url,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}

};




//reset Password
exports.resetPassword = async(req,res)=>{
    try{
       //data fetch
       const {password,token} =  req.body;
       
       //validation
       if(!password || !token){
        return res.status(400).json({
            success:false,
            message:"Please Enter ALL The Details"
        })
       }
       //get userDetails  from DB using Token 
       const userDetails    =  await User.findOne({token:token});
       //if no entry -  invalid Token
       if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Token is Invalid"
        })
       }

      //token time check
    
       if(userDetails.resetPasswordExpires <Date.now()){
        return  res.status(400).json({
            success:false,
            message:"Reset Password Time Out Please Try again Later "
        })
       }
       
       //hash password
       const hashedPassword =  await bcrypt.hash(password,10);
       
       //password update 

       await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
        );


       //return response
       return res.status(200).json({
        success:true,
        message:"Password Updated SuccessFully"
       })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Updating The password"
        })
    }
}
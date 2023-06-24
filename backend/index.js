const  express =  require("express");
const  app =  express();

//importing the routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const MedicineRoutes   = require("./routes/Medicine");



const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");


//dotenv Configuration
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//importing the modules
const cookieParser = require("cookie-parser");
// const cors = require("cors");


//connecting with database
const  database  =  require("./config/Database");
database.connect();

app.use(express.json());
app.use(cookieParser());

// connect the frontend and backend cors package would be used 
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/medicine",MedicineRoutes);

//activate the server 

//default  route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

//activate the server 
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})


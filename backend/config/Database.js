

//Data Base File
//Here I am using MongoDBCompass ..



const mongoose = require("mongoose");

//we have require .env file Because The Link for The dataBase would be there 
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB ka Connection SuccessFull");
    })
    .catch((err) => {
      console.log("DB connection Issues");
      console.error(err);
      process.exit(1);
    });
};


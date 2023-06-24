const  mongoose =  require("mongoose");

const  medicine =  new mongoose.Schema({
    AdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        trim:true,
    },
    name:{
        type:String,
        required:true,
    }
});

module.exports =  mongoose.model("Medicine",medicine);
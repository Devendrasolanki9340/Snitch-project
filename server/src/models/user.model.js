


import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    namr :{
        type: String,
        required : String,
    },
     password :{
        type: String,
        required : true,
    },
    role:{
        type: String,
        default: "user",
        enum :["user", "serller"]
    }
})

const ueserModel = mongoose.model("Snitch_Users",userSchema)


export default ueserModel
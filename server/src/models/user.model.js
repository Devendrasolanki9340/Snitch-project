

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "seller"]
    },
    refreshToken : {
        type : String,
    }
})

const userModel = mongoose.model("Snitch_Users", userSchema)

export default userModel
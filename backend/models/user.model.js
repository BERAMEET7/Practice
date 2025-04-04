const mongoose = require("mongoose");
const { type } = require("os");
const {Schema} = mongoose;


const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model("User" , UserSchema);
module.exports = User;
const userValidation = require("../validation/user.validator");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignup = async(req,res,next)=>{
   try {
    const {name , email , password} = req.body;

    // Validate request body
    const { error } = userValidation.validate(req.body, { abortEarly: false });
    if(error){
        return res.status(400).json({ success:false, message:"validatoin error", details : error.details.map((err)=>err.message)})
    }

    if(!name || !email || !password){
        return res.status(400).json({success: false , message: "ALL fields are required for the register"});
    }

    if (email){
        const checkemail = await User.findOne({email});
        if(checkemail){
            return res.status(400).json({success: false , message:"Email Already Exists! Go with Login"});
        }
    }
    const hasedpassword = await bcrypt.hash(password,10)

    let newUser = new User ({
        name , email , password:hasedpassword
    })
    await newUser.save();
    
    // Convert to object and remove password
   let userResponse = newUser.toObject();
   delete userResponse.password;

    return res.status(200).json({data:"Registered Successfully",userResponse});
   } catch (error) {
    next(error)
   }
}

exports.getAllUser = async(req,res,next)=>{
    try {
        const users = await User.find();
        return res.status(200).json({success:true, users});
    } catch (error) {
        next(error)
    }
}

exports.userLogin = async(req,res,next)=>{
    try {
        const {email ,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false , message: "email and password are required"});
        }

        let user = await User.findOne({email});
        
        const match =  bcrypt.compare(user.password,password);

        if(!match){
            return res.status(400).json({success:false,message:"password is incorrect Please try again"});
        }

        const token =  jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({success:true,token ,message:"Login Successfully"});
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const {userID} = req.params;

        const deletedUser = await User.findByIdAndDelete(userID);

        if(deletedUser){
            return res.status(200).json({success:true, deletedUser});
        }

        return res.status(400).json({success:false, message:"User not Deleted ! Try Again "})
    } catch (error) {
        next(error)
    }
}
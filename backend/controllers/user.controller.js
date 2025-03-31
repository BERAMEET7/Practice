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
        return res.status(400).json({success: false , message: "ALL feilds are required for the register"});
    }
    const hasedpassword = await bcrypt.hash(password,10)

    let newUser = new User ({
        name , email , password:hasedpassword
    })
    await newUser.save();

    return res.status(200).json({data:"hello from the user signup",newUser});
   } catch (error) {
    next(error)
   }
}

exports.userLogin = async(req,res,next)=>{
    try {
        const {email ,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false , message: "emial and password are required"});
        }

        let user = await User.findOne({email});
        
        const psword =  bcrypt.compare(user.password,password);

        if(!psword){
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
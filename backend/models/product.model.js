const mongoose = require("mongoose");
const User = require("./user.model");
const {Schema} = mongoose;

const ProductSchema = new Schema ({
    name:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String,
        enum:["category", "subcategory"],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
},{timestamps:true});

const Product = mongoose.model("Product" , ProductSchema);
modeule.exports = Product;
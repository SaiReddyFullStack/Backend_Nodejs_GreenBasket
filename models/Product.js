

const mongoose = require("mongoose")

// enum --> oka fixed set values ni set cheyyandi ki use it enum.
const Category_Enum = [
    "Vegetables","Fruits","Food-Grains"
]

const Unit_Enum = [
    "500g","1kg","2kgs"
]

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    category:{
        type:String,
        values:Category_Enum
    },
    unit:{
        type:String,
        values: Unit_Enum
    },
    image:{
        type:String    // default ga false are their
    },
    isActive:{
        type:Boolean  // t or false
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)  // db lo store Record name is product.
// product is record name.
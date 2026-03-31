

// product is record name
const Product = require("../models/Product.js")

// FUNCTION
exports.createProduct = async (req, res) => {
 try {
  const { name, desc, price, category, unit } = req.body || {};
  const image = req.file? `/uploads/${req.file.filename}`: null
 
  const products = await Product.create({
     name, desc, price, category, unit, image 
  })
  return res.status(200).json({msg:"products added",products})
 } catch (error) {
  console.log(error.message);
 }
}


// exports  ---> file lo no.of functions are their, vera vera file lo use cheyyadaki use it exports.


// products get here
// FUNCTION
exports.getProducts = async(req,res)=>{
    try {
        const newProducts = await Product.find()
        return res.status(201).json({msg:"success",newProducts})
    } catch (error) {
         console.error(error.message);   
    }
}
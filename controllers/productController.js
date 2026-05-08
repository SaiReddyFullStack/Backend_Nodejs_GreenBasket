

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
// products get here
exports.getProducts = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments(); // total count

        const newProducts = await Product.find()
            .skip(0)
            .limit(28);

        return res.status(200).json({
            msg: "success",
            totalProducts,   // total = 28
            showing: newProducts.length, // showing = 25
            newProducts
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
};
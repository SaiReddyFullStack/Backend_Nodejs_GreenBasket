
const Cart = require("../models/Cart")
// relation lo unna Models kuda import
const Product = require("../models/Product")
const User = require("../models/User")

// Function
// product ni addToCart
exports.addToCart = async(req,res)=>{
    try {
        // emailmiddleware USERID req.UserId okkade or both are same.
        const userId = req.userId;  // params id get it      // 1 --> userid update use it--> user ni
        const {productId ,quantity} = req.body;
        if(quantity<1){
            return res.status(400).json({msg:"Add to Product"})
        }
        const productExist = await Product.findById(productId)  //productId get it.
        if(!productExist){
            return res.status(400).json({msg:"Product Not Found"})
        }

        // Card UserId ni get it      cartUser
        let cart = await Cart.findOne({user:userId}) // 1
        if(!cart){
            cart = await Cart.create({  // user ni add it.
                user:userId,
                items:[{product:productId,quantity}]  // updated here --> CartModel details
            })
            return res.status(200).json({
                success:true,
                message:"Cart Created & Product Added",
                cart 
            })
        }
        // 
        
// Cartmodel lo items ni -- objectId ni converted into string.   findIndex=callbackfunction
        const itemIndex = cart.items.findIndex(
            item => item.product.toString()  === productId
        )
        if(itemIndex > -1){ // [-1 product ledhu]     [ > --- product undhi]
            cart.items[itemIndex].quantity += quantity  // qunatity updated here ex.1,2,3 add it.
        }
        else{ // cart loki items push it.
            cart.items.push({product:productId,quantity})
        }
        await cart.save()

        res.json({  success:true,
                message:"Product Added Success",
                 })
                 
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


// Function
// Getcart Items
exports.getCartItems = async(req,res)=>{
    try {              // CartModel     user     // emailmiddleware undi userId come it
        const cart = await Cart.findOne({user:req.userId}) // id get it
        .populate("user","email")
        .populate("items.product")
        if(!cart){
            return res.status(404).json({msg:"Carts Not Found"})
        }
        res.json({success:true, cart})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


// Function
// Remove    delete
exports.removeFromCart = async(req, res)=>{
    try {
        const cart = await Cart.findOneAndUpdate(
            {user: req.userId},
            {$pull: {items: {product: req.params.productId}}}, 
            {new:true}
        )
        res.json({
            success:true,
            message:"Product removed",
            cart
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}


// Function
// Update
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId.toString()
      );
      await cart.save();
      return res.json({ success: true, message: "Product removed", cart });
    }

    const item = cart.items.find(
      item => item.product.toString() === productId.toString()
    );

    if (!item) {
      return res.status(404).json({ msg: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      message: "Quantity updated",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const controller = require("../controllers/cartController")
const express = require("express")

const email = require("../middlewares/emailMiddleware")
// emailmiddleware USERID req:UserId okkade or both are same.
// emailmiddleware dara user ni identify chestam
// middleware add to cart and get to cart
const router = express.Router();

//            epoints        vname filename        vname      fname
router.post("/add-to-cart", email.emailMiddleware, controller.addToCart)
router.get("/get-product",email.emailMiddleware,controller.getCartItems)
router.put("/update-carts",email.emailMiddleware,controller.updateQuantity)
router.delete("/delete/:productId",email.emailMiddleware,controller.removeFromCart)

module.exports = router
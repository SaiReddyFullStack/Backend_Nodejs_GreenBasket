

// controlles file --> function.
// function ki Route kavalli --> createProduct.

// router --> inbuild.
// router dara api ni build cheyyavachu.


const express = require("express");
const controller = require("../controllers/productController")
const upload = require("../middlewares/imageMiddleware")
const protected = require("../middlewares/adminMiddleware") // adminmiddleware
const searchController = require("../controllers/searchController")

const router = express.Router();

//             endpoint                        functionname
router.post("/add-product",protected.adminMiddleware,
    upload.single("image"),controller.createProduct)
    
router.get("/show-product",controller.getProducts)
router.get("/search",searchController.searchProducts)


module.exports = router

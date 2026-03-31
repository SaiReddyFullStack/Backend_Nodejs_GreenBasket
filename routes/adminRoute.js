

const controller = require("../controllers/adminController")
const express = require("express")

const router = express.Router()

//             endpoint      variablename  functionname  
router.post("/admin-register",controller.adminRegister)  // endpoint foldername function
router.post("/admin-login",controller.adminLogin)

module.exports = router
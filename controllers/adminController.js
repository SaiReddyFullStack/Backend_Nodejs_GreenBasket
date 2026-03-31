
const Admin  = require("../models/Admin.js")
const bcrypt = require("bcryptjs")
//Admin Login
const jwt = require("jsonwebtoken")

// Register
// function Register  --> Logic write here.
exports.adminRegister = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        // email already db lo undhi try another email .
        const adminRecord = await Admin.findOne({email})
        if(adminRecord){
            return res.status(400).json({msg:"email already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10) // 10times 

        const admin = await Admin.create({          // 1 admin lo send it 3 credetionals.
            name,email,password:hashedPassword
        })
        return res.status(201).json({msg:"admin registered"})
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}


// Admin Login Function --> only email and password match db data
exports.adminLogin = async(req,res)=>{
    try {
        const {email,password}= req.body;

        const adminRecord = await Admin.findOne({email}) // email verfiy
        if(!adminRecord){
            return res.status(401).json({msg:"invalid credentials"})
        }
        const adminPassword = await bcrypt.compare(password,adminRecord.password)// password verfiy
        if(!adminPassword){
           return res.status(401).json({msg:"invalid credentials"})   
        }
        // Token generated here
        const token = jwt.sign(
            {adminId:adminRecord._id}, // variable: database money id assign it
            process.env.JWT_SECRET,
            {expiresIn:"10d"}  
        )
        return res.status(200).json({msg:"login success",token})

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
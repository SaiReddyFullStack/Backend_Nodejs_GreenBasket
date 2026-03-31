
const jwt = require("jsonwebtoken")

const dotEnv = require("dotenv")
dotEnv.config();

// middleware use chesi routes ni protected chestam.
// function         // success after next call it.
exports.emailMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){ // false ayyatha
        return res.status(401).json({msg:"Token Wrong"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded._id;   // emailcontroller --> token --> email,userid
        req.userEmail= decoded.email
        next()  //  success after next call it.
    } catch (error) {
        return res.status(403).json({msg:"invalid token or expired token"})
    }
}    
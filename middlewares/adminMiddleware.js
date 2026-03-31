
// screenshot
// 3.step

const jwt = require("jsonwebtoken")

const dotEnv = require("dotenv")
dotEnv.config();

// userlogin ki token already vachandhi , aa token middleware dara token/route ni verfiy it.
// Route ki Token attach.
// token ni route ki protect.
// route --> lhost:9000/admin/admin-login

// function         // success after next call it.
exports.adminMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){ // false ayyatha
        return res.status(401).json({msg:"Token Wrong"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.adminId = decoded.adminId //  admincontroller --> token --> adminid
        next()  //  success after next call it.
    } catch (error) {
        return res.status(403).json({msg:"invalid token"})
    }
}    
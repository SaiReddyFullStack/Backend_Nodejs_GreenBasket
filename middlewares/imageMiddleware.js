

// middleware 
const multer = require("multer")
const path = require("path")

// multer dara images disk lo storage it.
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{     // cb callback function
        cb(null, path.join(__dirname,"../uploads"))
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        const name = path
        .basename(file.originalname,ext) // file extension get it.
        .replace(/\s+/g, "-");
        cb(null,`${Date.now()}-${name}${ext}`)
    }
})

const upload = multer({storage})
module.exports = upload
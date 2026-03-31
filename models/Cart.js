
// userID --> dara 
// UserId --> productId  --> Quantity --> CardUpdate 
const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    // UserModel ki cart ki relation form it here.
    user:{  // unique id.
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[  // ProductModel ki cart ki relation form it here.
       {
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
        unique:true
        },

        quantity:{       // only update use  ex.1,2,3, add it
            type:Number,
            required:true,
            min:1  // min 1 item add  it
        }
       }
    ]
})

module.exports = mongoose.model("Cart",cartSchema)

// how many digits otp generate use it .

// Function
exports.generateOtp = ()=>{
    //console.log(generateOtp());
    return Math.floor(100000 + Math.random() * 90000).toString()
    //                6digits otp generated
    
}


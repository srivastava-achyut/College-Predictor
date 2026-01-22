const express=require('express')
const router = express.Router()
const User = require('../models/User')
const otpStore = require('../utils/otpStore')

router.post("/send-otp",async(req,res)=>{
    const {email,mobile} = req.body;

    if(!email && !mobile){
        res.status(400).json({message:'email or password are required'})
    }
    const key = email||mobile
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
     const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

     otpStore.set(key, { otp, expiresAt });

  console.log("OTP for", key, "is", otp);

   res.json({ success: true, message: "OTP sent" });
})

module.exports = router;
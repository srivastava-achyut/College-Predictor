const express=require('express')
const router = express.Router()
const User = require('../models/User')
const otpStore = require('../utils/otpStore')
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");

const sendOtpEmail=require("../utils/sendOtp");

router.post("/send-otp",async(req,res)=>{
    const {email,mobile} = req.body;

    if(!email && !mobile){
        res.status(400).json({message:'email or mobile are required'})
    }
    const key = email||mobile
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
     const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

     otpStore.set(key, { otp, expiresAt });

  console.log("OTP for", key, "is", otp);
  if(email){
    await sendOtpEmail(email,otp);   
  }

   res.json({ success: true, message: "OTP sent" });
})

router.post("/verify-otp", async (req, res) => {
  const { email, mobile, otp } = req.body;

  const key = email || mobile;
  if (!key || !otp) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const record = otpStore.get(key);
  if (!record) {
    return res.status(400).json({ message: "OTP not found" });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  // OTP valid → remove
  otpStore.delete(key);

  let user = await User.findOne({
    $or: [{ email }, { mobile }]
  });

  if (!user) {
    user = await User.create({
      email,
      mobile
    });
  }

  const token = generateToken(user);

  res.json({
  success: true,
  token,
  user: {
    id: user._id,
    email: user.email,
    mobile: user.mobile,
    name: user.name || null,
    isProfileComplete: !!user.name
  }
});

});
router.post("/complete-profile",jwtAuthMiddleware,  async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name;
  await user.save();

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isProfileComplete: true,
    },
  });
});

router.get("/me", async (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    userId: req.user.id,
  });
});


module.exports = router;
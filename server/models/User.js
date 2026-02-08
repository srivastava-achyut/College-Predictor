
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    mobile: { type: String },
    name: { type: String }, // optional initially
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

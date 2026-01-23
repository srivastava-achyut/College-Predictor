// const mongoose=require("mongoose")
// const userSchema = new mongoose.Schema(
//     {
//         name:{
//             type:String,
//             required: false,
//             trim: true,
//         },
//         email:{
//             type:String,
//             trim:true,
//             lowercase:true,
//         },
//         mobile:{
//             type:String,
//             trim: true,

//         },
    
//     },
//     {
//     timestamps: true,
//   }

// )
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   this.password = await bcrypt.hash(this.password, 10);
// });


// module.exports = mongoose.model("User", userSchema);
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

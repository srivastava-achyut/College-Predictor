const mongoose=require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            trim:true,
            lowercase:true,
        },
        mobile:{
            type:String,
            trim: true,

        },
    
    },
    {
    timestamps: true,
  }

)
userSchema.pre("save", function (next) {
  if (!this.email && !this.mobile) {
    next(new Error("Either email or mobile is required"));
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
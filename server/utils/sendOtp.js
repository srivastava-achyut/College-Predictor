const nodemailer=require("nodemailer");

const sendOtpEmail = async(email,otp) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    })

    await transporter.sendMail({
        from: `"College Predictor" <${process.env.EMAIL_USER}`,
        to:email,
        subject:"Your OTP for Login",
        html:`<h2> Your Otp is: <b>${otp}</b></h2><p>Valid for 5 minutes</p>`,
    })
}

module.exports=sendOtpEmail;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,  // Make sure this is App Password
  },
});

const sendMail = (to, otp) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: to,
        subject: "Reset Your Password",
        html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

export default sendMail;

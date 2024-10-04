import User from "../../db/models/user.model.js";
import { customAlphabet } from "nanoid";
import { sendMail } from "../../services/sendEmail.js";
import { mailBody } from "../../utils/mailTemplate.js";
export const forgetPassword = (req, res) => {
  res.render("forgetPassword.ejs");
};

export const handleForgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
    }
    const code = customAlphabet("0123456789", 4);

    const otp = code();
    req.session.otp = otp;
    req.session.email = email; // Save email in session
    req.session.otpExpires = Date.now() + 3600000; // 1-hour expiration

    try {
      await sendMail({
        to: email,
        subject: "Code to reset password",
        htmlMessage: mailBody(otp),
      });
    } catch (err) {
      req.session.otp = undefined;
      req.session.email = undefined; // Save email in session
      req.session.otpExpires = undefined;
      return redirect("/forgot-password");
    }
    res.redirect("/verfiy-otp");
  } catch (err) {
    res.redirect("forget-password");
  }
};

export const verifyOtp = (req, res) => {
  res.render("verifyOtp.ejs");
};

export const handleVerfiyOtp = (req, res) => {
  const { num } = req.body;

  const otp = num.join("");

  if (!req.session.otp || !req.session.otpExpires) {
    return res.status(400).send("OTP expired or invalid");
  }
  if (req.session.otp != parseInt(otp) || Date.now() > req.session.otpExpires) {
    return res.status(400).send("Invalid or expired OTP");
  }
  res.redirect("/reset-password");
};

export const resetPassword = (req, res) => {
  res.render("resetPassword.ejs");
};

export const handleResetPassword = async (req, res) => {
  try {
    const { password, confirmpassword } = req.body;
    if (password != confirmpassword) {
      return res.render("resetPassword.ejs");
    }

    const user = await User.findOne({ email: req.session.email });
    if (!user) {
      return res.render("resetPassword.ejs");
    }
    user.password = password;

    await user.save();
    // Clear session data after password reset
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
    });
    res.redirect("/login");
  } catch (error) {
    res.render("resetPassword.ejs");
  }
};

const User = require("../models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const generateVerificationToken = () => {
  return jwt.sign({}, process.env.SECRET_KEY, { expiresIn: "1d" });
};

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000/verify/?token=${token}`;

  const msg = {
    to: email,
    from: "jefrin.p@armiasystems.com",
    subject: "Verify Your Email",
    text: `Click the following link to verify your email: ${verificationLink}`,
    html: `<p>Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      if (existingUser.isDeleted) {
        existingUser.isDeleted = false;
        const verificationToken = existingUser.verificationToken;
        await existingUser.save();
        await sendVerificationEmail(email, verificationToken);
        return res.status(201).json({
          message: "Verification email is sent to your email",
          verificationToken,
        });
      } else {
        return res.status(409).json({ message: "User already exists" });
      }
    }
    const verificationToken = generateVerificationToken();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      mobile,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "Verification email is sent to your email",
      verificationToken,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Error registering user" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.body.token;
    // console.log(token, "token");

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.isVerified = true;
    await user.save();
    // console.log(user,"userrrrr")
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, isDeleted: false });
    if (!user) {
      res.status(401).json({ message: "User Doesnot exist" });
    }

    if (!user.isVerified) {
      res.status(402).json({ message: "Email not verified" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password. Try again" });
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in signing up" });
  }
};

const forgotPass = async (req, res) => {
  try {
    const email = req.body.formData;
    // console.log(email)
    const oldUser = await User.findOne({ email: email, isDeleted: false });
    // console.log(oldUser,"userrrrr")
    if (!oldUser) {
      return res.send("user doesnot exists");
    }
    const token = oldUser.verificationToken;
    const link = `http://localhost:3000/resetpassword/?token=${token}`;
    const msg = {
      to: email,
      from: "jefrin.p@armiasystems.com",
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${link}`,
      html: `<p>Click the following link to reset your password: <a href="${link}">${link}</a></p>`,
    };
    await sgMail.send(msg);
    res.status(200).json({ message: "Link is sent to your given email" });
  } catch (error) {
    console.error("SendGrid error:", error);
    throw error;
  }
};

const resetPass = async (req, res) => {
  const { token, newPassword } = req.body;
  // console.log(req.body)
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).json({ message: 'Reset Failed' });
  } 

  const passwordMatch = await bcrypt.compare(newPassword, user.password);

  if (passwordMatch) {
    return res.status(401).json({ message: 'New password must be different from the old one' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
};

module.exports = {
  createUser,
  verifyUser,
  loginUser,
  forgotPass,
  resetPass,
};

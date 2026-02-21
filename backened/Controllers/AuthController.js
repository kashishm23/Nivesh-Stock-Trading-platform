const User=require("../model/UserModel");
const {createSecretToken}=require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const user = await User.create({ email, password, username });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: false,
    });

    return res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
};
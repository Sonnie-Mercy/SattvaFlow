const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const errorHandler = require("../utils/errorHandler");
const generateToken = require("../utils/generateToken.js");

// register
// link: api/auth/register;
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, name, age, gender } = req.body;

    if (!email || !password || !name || !age || !gender) {
      errorHandler("Please fill all the required fields", 400);
    }

    let user = await User.findOne({ email });

    if (user) {
      errorHandler("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    const token = generateToken(user._id);

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .status(200)
      .json({
        success: true,
        message: "User Sign up successfully",
        data: {
          token,
          user,
        },
      });
  } catch (error) {
    next(error);
  }
};

// login
// link: api/auth/login;
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      errorHandler("Please fill all the fields", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      errorHandler("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errorHandler("Invalid credentials", 401);
    }

    const token = generateToken(user._id);

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user,
        },
      });
  } catch (error) {
    next(error);
  }
};

// logout
// link: api/user/logout;
exports.logoutUser = async (req, res, next) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

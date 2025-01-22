const User = require("../models/userModel");

const errorHandler = require("../utils/errorHandler");

// change password
// link : api/user/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      errorHandler("Please fill all the required fields", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      errorHandler("User not found", 404);
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      errorHandler("Incorrect password", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update profile
// link : api/user/update
exports.updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { name, email, age, gender } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      errorHandler("User not found", 404);
    }

    if (user.email !== email) {
      const isEmailExist = await User.findOne({ email });

      if (isEmailExist) {
        errorHandler("Email already exists", 400);
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;
    user.gender = gender || user.gender;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// get user profile
// link : api/user/details
exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      errorHandler("User not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

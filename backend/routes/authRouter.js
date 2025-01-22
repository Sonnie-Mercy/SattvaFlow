const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/tokenAuth");

// controllers
const authController = require("../controllers/authControllers");

// register user
// link : api/auth/register
router.route("/register").post(authController.registerUser);

// login user
// link : api/auth/login
router.route("/login").post(authController.loginUser);

// logout user
// link : api/auth/logout
router.route("/logout").get(authController.logoutUser);

module.exports = router;

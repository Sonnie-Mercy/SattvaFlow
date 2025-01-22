const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/tokenAuth");

// controllers
const userController = require("../controllers/userControllers");

// change password
// link       /api/user/change-password
router
  .route("/change-password")
  .patch(verifyToken, userController.changePassword);

// change user details
// link       /api/user/update
router.route("/update").patch(verifyToken, userController.updateProfile);

// Fetch user details
// link       /api/user/details
router.route("/details").get(verifyToken, userController.getUserProfile);

module.exports = router;

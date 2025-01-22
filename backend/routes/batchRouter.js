const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/tokenAuth");

// controllers
const batchController = require("../controllers/batchControllers");

// register to batch for yoga class
// link : api/batch/register
router.route("/register").post(verifyToken, batchController.registerToBatch);

// get all batches
// link : api/batch/details
router.route("/details").get(verifyToken, batchController.getUserBatchDetails);

// make payment
// link : api/batch/payment
router.route("/payment").post(verifyToken, batchController.batchPayment);

module.exports = router;

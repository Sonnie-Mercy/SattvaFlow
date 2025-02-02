const User = require("../models/userModel");
const Batch = require("../models/batchModel");
const CompletePayment = require("../utils/makePayments");
const errorHandler = require("../utils/errorHandler");

// Register to batch for yoga class
exports.registerToBatch = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { batch, enrollDate } = req.body;

    if (!batch || !enrollDate) {
      return next(errorHandler("Batch and enrollment date are required.", 400));
    }

    const user = await User.findById(userId);
    if (!user || user.age < 14 || user.age > 99) {
      return next(errorHandler("Invalid user or age not eligible.", 400));
    }

    const enrollMonth = new Date(enrollDate).toLocaleString("default", { month: "long" });
    const existingBatch = await Batch.findOne({ user: userId, month: enrollMonth });

    if (existingBatch) {
      return next(errorHandler(`Already registered for ${enrollMonth}.`, 400));
    }

    const newBatch = await Batch.create({
      user: userId,
      batch,
      month: enrollMonth,
      enrollDate,
      active: enrollMonth === new Date().toLocaleString("default", { month: "long" }), // Set 'active' for current month
    });

    res.status(201).json({
      message: "Enrollment successful.",
      data: newBatch,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch user batch details
exports.getUserBatchDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const batches = await Batch.find({ user: userId }).populate("user");
    if (!batches || batches.length === 0) {
      return next(errorHandler("No batches found for this user.", 404));
    }

    const formattedBatches = batches.map((batch) => ({
      _id: batch._id,
      batchName: batch.batch,
      month: batch.month,
      enrollDate: batch.enrollDate,
      active: batch.active,
      paymentStatus: batch.paymentStatus || false,
    }));

    res.status(200).json({
      success: true,
      data: formattedBatches,
    });
  } catch (error) {
    next(error);
  }
};

// Process batch payment and update status
exports.batchPayment = async (req, res, next) => {
  try {
    const { batchId, paymentDetails } = req.body;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return next(errorHandler("Batch not found.", 404));
    }

    if (batch.paymentStatus) {
      return next(errorHandler("Payment already completed.", 400));
    }

    // Process the payment
    batch.paymentStatus = CompletePayment(paymentDetails); // Assuming this updates correctly
    if (batch.paymentStatus) {
      // Activate the batch after successful payment
      batch.active = true;
    }

    await batch.save();

    res.status(200).json({
      success: true,
      message: "Payment successful, batch activated.",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};
const User = require("../models/userModel");
const Batch = require("../models/batchModel");

const CompletePayment = require("../utils/makePayments");
const errorHandler = require("../utils/errorHandler");

// register to batch for yoga class
exports.registerToBatch = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { batch, enrollDate } = req.body;

    if (!batch || !enrollDate) {
      return next(errorHandler("Both batch and enrollment date are required to proceed.", 400));

    }

    const user = await User.findById(userId);
    if (!user || user.age < 14 || user.age > 99) {
      return next(errorHandler("User is either invalid or not eligible for enrollment (age must be between 14 and 99).", 400));

    }

    if (!enrollDate || isNaN(Date.parse(enrollDate))) {
      return next(errorHandler(`The provided enrollment date "${enrollDate}" is invalid. Please provide a valid date.`, 400));

    }

    const enrollMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(enrollDate));

    const existingBatch = await Batch.findOne({ user: userId, month: enrollMonth });
    if (existingBatch) {
      return next(errorHandler(`Enrollment failed: User is already registered for a batch in ${enrollMonth}.`, 400));

    }

    const newBatch = await Batch.create({
      user,
      batch,
      month: enrollMonth,
      enrollDate,
      active: enrollMonth === new Date().toLocaleString("default", { month: "long" }) ? true : false,
    });

    return res.status(201).json({
      message: "Enrollment completed successfully.",
      data: newBatch,
    });
  } catch (error) {
    next(error);
  }
};

// get user batch details
exports.getUserBatchDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const currentMonth = new Date().toLocaleString("default", { month: "long" });

    const batch = await Batch.find({ user: userId }).populate("user");
    if (!batch || batch.length === 0) {
      return next(errorHandler("Batch not found", 404));
    }

    const enrollmentDetails = batch.map((item) => {
      return {
        batchId: item._id,
        batchName: item.batch,
        month: item.month,
        enrollDate: item.enrollDate,
        status: item.month === currentMonth ? "Active" : "Inactive",
      };
    });

    return res.status(200).json({
      success: true,
      message: "Batch details fetched successfully",
      data: enrollmentDetails, // Return the formatted enrollmentDetails
    });
  } catch (error) {
    next(error);
  }
};

// complete payment for batch
exports.batchPayment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { batchId, paymentDetails } = req.body;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return next(errorHandler("Batch not found", 400));
    }

    if (batch.paymentStatus) {
      return next(errorHandler("Payment for this batch has already been completed.", 400));
    }

    batch.paymentStatus = CompletePayment(paymentDetails);
    await batch.save();

    return res.status(200).json({
      success: true,
      message: "Payment completed successfully",
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};
const User = require("../models/userModel");
const Batch = require("../models/batchModel");

const CompletePayment = require("../utils/makePayments");
const errorHandler = require("../utils/errorHandler");

// register to batch for yoga class
// link : api/batch/register/
exports.registerToBatch = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { batch, enrollDate } = req.body;

    if (!batch || !enrollDate) {
      errorHandler("Please fill all the required fields", 400);
    }

    const user = await User.findById(userId);

    if (!user || user.age < 14 || user.age > 99) {
      errorHandler("Invalid user or age. Unable to enroll.", 400);
    }

    const enrollMonth = enrollDate
      ? new Intl.DateTimeFormat("en-US", { month: "long" }).format(
          new Date(enrollDate)
        )
      : null;

    if (!enrollMonth) {
      errorHandler(
        `Invalid enrollment date. Unable to enroll. ${enrollDate}`,
        400
      );
    }

    if (enrollMonth) {
      const existingBatch = await Batch.findOne({
        user: userId,
        month: enrollMonth,
      });

      if (existingBatch) {
        errorHandler(
          `User is already enrolled in a batch for ${enrollMonth}.`,
          400
        );
      }
    }

    const newBatch = await Batch.create({
      user,
      batch,
      month: enrollMonth || new Date().toLocaleString("default", { month: "long" }),
      enrollDate,
      active: enrollMonth == new Date().toLocaleString("default", { month: "long" }) ? true : false,
    });

    return res
      .status(201)
      .json({
        message: "Enrollment completed successfully.",
        data: {
          batchId: newBatch._id,
          batchName: newBatch.batch,
          month: newBatch.month,
          enrollDate: newBatch.enrollDate,
          status: newBatch.active ? "Active" : "Inactive",
        },
      });
  } catch (error) {
    next(error);
  }
};

// get user batch details
// link : api/batch/details
exports.getUserBatchDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });

    const batch = await Batch.find({ user: userId }).populate("user");

    if (!batch || batch.length === 0) {
      errorHandler("Batch not found", 404);
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
      data: batch,
    });
  } catch (error) {
    next(error);
  }
};

// complete payment for batch
// link : api/batch/payment
exports.batchPayment = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { batchId, paymentDetails } = req.body;

    const batch = await Batch.findById(batchId);

    if (!batch) {
      errorHandler("Batch not found", 400);
    }

    if (batch.paymentStatus) {
      errorHandler("Payment for this batch has already been completed.", 400);
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
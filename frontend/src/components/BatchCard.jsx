import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useDispatch, useSelector } from "react-redux";
import {
  batchPaymentAsyncThunk,
  getUserBatchDetailsAsyncThunk,
  selectBatchLoading,
} from "../features/batch/batchSclice";
import { useNavigate } from "react-router-dom";

const BatchCard = ({ batch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectBatchLoading);

  const handlePayment = async () => {
    try {
      const paymentResponse = await dispatch(batchPaymentAsyncThunk(batch._id));
      console.log("Payment Response:", paymentResponse);

      const batchDetailsResponse = await dispatch(getUserBatchDetailsAsyncThunk());
      console.log("Updated Batch Details:", batchDetailsResponse);

      alert("Payment completed");
    } catch (error) {
      console.error("Error in payment or fetching batches:", error);
      alert("Failed to complete the payment. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-md">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Month: {batch.month || "N/A"}
          </div>
          <p className="mt-2 text-gray-500">Batch Time: {batch.batch || "Not Specified"}</p>
          <p className="mt-2 text-gray-500">
            Enroll Date: {batch.enrollDate ? new Date(batch.enrollDate).toLocaleDateString() : "N/A"}
          </p>
          <p
            className={`mt-2 ${batch.active ? "text-green-500" : "text-red-500"}`}
          >
            Status: {batch.active ? "Active" : "Inactive"}
          </p>
          {batch.active && !batch.paymentStatus ? (
            <p className="mt-2 text-red-500">Please make a payment to join the class.</p>
          ) : (
            batch.paymentStatus && (
              <p className="mt-2 text-green-500">Payment Completed</p>
            )
          )}
          {loading ? (
            <button
              disabled
              className="mt-4 bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
            >
              Processing...
            </button>
          ) : !batch.paymentStatus ? (
            <button
              onClick={handlePayment}
              className="mt-4 bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-800"
            >
              Pay Now
            </button>
          ) : (
            batch.active &&
            batch.paymentStatus && (
              <button
                onClick={() => navigate(`/yoga-class/${batch._id}`)}
                className="mt-4 bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-800"
              >
                Join Class
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// Prop validation
BatchCard.propTypes = {
  batch: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    month: PropTypes.string,
    batch: PropTypes.string,
    enrollDate: PropTypes.string,
    active: PropTypes.bool,
    paymentStatus: PropTypes.bool,
  }).isRequired,
};

export default BatchCard;

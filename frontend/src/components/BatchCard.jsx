import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  batchPaymentAsyncThunk,
  getUserBatchDetailsAsyncThunk,
  selectBatchLoading,
} from "../features/batch/batchSclice";

const BatchCard = ({ batch }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectBatchLoading);

  const handlePayment = async () => {
    try {
      await dispatch(batchPaymentAsyncThunk(batch.batchId)); // Handle the payment and status change
      await dispatch(getUserBatchDetailsAsyncThunk()); // Fetch updated batch details after payment
      alert("Payment successful!");
    } catch (error) {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="card">
      <h3>{batch.batchName || "Batch Name Not Available"}</h3>
      <p>Month: {batch.month}</p>
      <p>Enroll Date: {new Date(batch.enrollDate).toLocaleDateString()}</p>
      <p>Status: {batch.active ? "Active" : "Inactive"}</p>
      {!batch.paymentStatus && batch.active ? (
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      ) : (
        <p>Payment Status: {batch.paymentStatus ? "Completed" : "Pending"}</p>
      )}
    </div>
  );
};

BatchCard.propTypes = {
  batch: PropTypes.shape({
    batchId: PropTypes.string.isRequired,
    batchName: PropTypes.string,
    month: PropTypes.string,
    enrollDate: PropTypes.string,
    active: PropTypes.bool,
    paymentStatus: PropTypes.bool,
  }).isRequired,
};

export default BatchCard;
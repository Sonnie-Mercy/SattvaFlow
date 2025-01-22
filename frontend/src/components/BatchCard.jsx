import React from "react";
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
    await dispatch(batchPaymentAsyncThunk(batch._id)).then(() => {
      alert("Payment completed");
    });
    await dispatch(getUserBatchDetailsAsyncThunk());
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-md">
        <div className="md:flex">
          <div className="md:flex-shrink-0"></div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Month: {batch.month}
            </div>
            <p className="mt-2 text-gray-500"> Batch Time : {batch.batch}</p>
            <p className="mt-2 text-gray-500">
              Enroll Date: {new Date(batch.enrollDate).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 ${
                batch.active === true ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {batch.active ? "Active" : "Inactive"}
            </p>
            {batch.active && !batch.paymentStatus ? (
              <p className="mt-2 text-red-500">
                Please make a payment to join the class.
              </p>
            ) : (
              batch.paymentStatus && (
                <p className="mt-2 text-green-500">Payment Completed</p>
              )
            )}
            {!batch.paymentStatus && (
              <button
                onClick={handlePayment}
                className="mt-4 bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-800"
              >
                {/* {loading ? "Loading..." : "Pay Now"} */}
                Pay Now
              </button>
            )}
            {batch.active && batch.paymentStatus && (
              <button
                onClick={() => navigate(`/yoga-class/${batch._id}`)}
                className="mt-4 bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-800"
              >
                Join Class
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchCard;

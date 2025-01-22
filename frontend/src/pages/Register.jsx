import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrollAsyncThunk, selectBatch } from "../features/batch/batchSclice";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/user/userSclice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const batchList = useSelector(selectBatch);
  const user = useSelector(selectUser);

  const [batchTime, setBatchTime] = useState("");
  const [startDate, setStartDate] = useState(getFormattedDate(new Date()));

  const handleBatchTimeChange = (e) => {
    setBatchTime(e.target.value);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      setStartDate(getFormattedDate(selectedDate));
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      if (user.age < 18 || user.age > 65) {
        alert("You are not eligible for this class");
        return;
      }

      if (batchTime && startDate) {
        dispatch(enrollAsyncThunk({ batch: batchTime, enrollDate: startDate }))
          .then(() => {
            alert("user enrolled successfully");
          })
          .then(() => {
            navigate("/home");
          });
      }
    } catch (err) {
      alert("user have already enrolled for this batch");
    }
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className="p-10">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-4xl font-semibold mb-4">
            Register for the a Sattva Flow Experience
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="batchTime"
                className="block text-gray-600 font-medium"
              >
                Batch Time
              </label>
              <select
                id="batchTime"
                name="batchTime"
                value={batchTime}
                onChange={handleBatchTimeChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Batch Time</option>
                <option value="6-7 AM">6-7 AM</option>
                <option value="7-8 AM">7-8 AM</option>
                <option value="8-9 AM">8-9 AM</option>
                <option value="5-6 PM">5-6 PM</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="startDate"
                className="block text-gray-600 font-medium"
              >
                Expected Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={!batchTime || !startDate}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

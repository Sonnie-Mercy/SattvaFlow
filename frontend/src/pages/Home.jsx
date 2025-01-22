import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BatchCard from "../components/BatchCard";
import {
  getUserBatchDetailsAsyncThunk,
  selectBatch,
  selectBatchError,
  selectBatchLoading,
} from "../features/batch/batchSclice";

const Home = () => {
  const dispatch = useDispatch();

  const batchList = useSelector(selectBatch);
  const loading = useSelector(selectBatchLoading);
  const error = useSelector(selectBatchError);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserBatchDetailsAsyncThunk());
    };

    fetchData();
  }, [dispatch, error]);
  
  if (!Array.isArray(batchList)) {
    console.error("Expected batchList to be an array but got:", batchList);
    return <div>Error: Batch list is not an array</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center p-5 shadow ">
        <p className="max-w-lg text-4xl font-bold leading-normal text-lime-500 ">
          Welcome to Sattva Flow
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 p-5">
        {batchList.map((batch) => (
          <BatchCard key={batch._id} batch={batch} />
        ))}
      </div>
    </>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <div className="flex flex-row gap-3">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              JOIN
            </h2>
            <div className="w-min text-lime-500 text-4xl font-bold font-['Inter']">
              SATTVA
            </div>
            <div className="w-min h-7 text-violet-500 text-opacity-80 text-4xl font-bold font-['Inter']">
              FLOW
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-4">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="block text-center text-white bg-lime-500 hover:bg-lime-800 py-2 px-4 rounded-full transition duration-300"
            >
              Login
            </Link>
          </div>
          <div>
            <p className="text-gray-600 text-lg mb-4">New to Sattva Flow?</p>
            <Link
              to="/signup"
              className="block text-center text-white bg-purple-500 hover:bg-purple-800 py-2 px-4 rounded-full transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

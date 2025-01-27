import React from "react";
import { Link } from "react-router-dom";

const YogaPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center gap-5 bg-purple-200">
        <p className="text-4xl font-black text-purple-900">Flow with Sattva Flow</p>
        <p className="text-4xl font-black text-purple-900">🧘‍♂️</p>
        <Link
          to="/home"
          className="text-white bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
        >
          Thank you for choosing yoga with Us
        </Link>
      </div>
    </>
  );
};

export default YogaPage;
import React from "react";

const YogaLogo = (props) => {
  return (
    <>
      <div className="flex h-screen bg purple-900">
        <div className="flex flex-col lg:flex-row min-h-full flex-1 gap-4 justify-center items-center px-6 py-12 lg:px-8">
          <span className="text-lime-500 text-8xl font-bold font-['Inter'] ">
            SATTVA
          </span>
          <span className="text-violet-700 text-opacity-80 text-8xl font-bold font-['Inter'] ">
            FLOW
          </span>
        </div>
        <div className="flex bg-violet-800 w-2/4 justify-center items-center">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default YogaLogo;

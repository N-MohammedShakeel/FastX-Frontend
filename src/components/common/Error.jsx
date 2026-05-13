import React from "react";

const Error = ({ message = "Something went wrong" }) => {
  return (
    <div className="bg-white rounded-xl p-10 text-center shadow">
      <div className="text-red-500 text-5xl">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-800">{message}</h3>
    </div>
  );
};

export default Error;

import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-[#005CAB] font-black text-md bg-blue-100 px-2 py-1 rounded-lg"
    >
      <i className="fa-solid fa-arrow-left"></i>
      Back
    </button>
  );
};

export default BackButton;

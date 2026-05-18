import React from "react";

import { useNavigate } from "react-router-dom";

export const SeatSelectionSummary = ({
  selectedSeats,
  fare = 0,
  busId,
  busData,
}) => {
  const navigate = useNavigate();

  const total = selectedSeats.length * fare;

  const handleContinue = () => {
    navigate("/passenger/checkout", {
      state: {
        busId,
        selectedSeats,
        totalFare: total,
        totalNoOfSeats: selectedSeats.length,
        busData,
      },
    });
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow space-y-6 max-w-sm">
      <div className="py-2">
        <p className="text-md font-semibold text-slate-800">Selected Seats</p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <span
                key={seat}
                className="bg-[#ebe9e9] px-3 py-2 rounded-lg text-sm font-bold text-[#005CAB]"
              >
                {seat}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400">No seats selected</p>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-700">
            Base Fare ({selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "Seat" : "Seats"})
          </span>

          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="pt-4 flex justify-between items-center bg-slate-100 rounded-lg px-4 py-3">
        <span className="text-slate-800 font-semibold">TOTAL FARE</span>

        <span className="text-2xl sm:text-3xl font-extrabold text-[#005CAB]">
          ₹{total.toFixed(2)}
        </span>
      </div>

      <div>
        <button
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 sm:py-4 rounded-xl font-bold transition 
          ${
            selectedSeats.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white"
          }`}
        >
          Continue to Booking
        </button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

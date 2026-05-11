import React from "react";

import volvoImg from "../../../assets/volvo.jpg";

const BookingSummary = ({ bookingInfo, onConfirm, loading }) => {
  const bus = bookingInfo.busData;

  return (
    <div className="w-full bg-white p-5 sm:p-6 rounded-2xl shadow space-y-6">
      <div className="relative rounded-xl overflow-hidden">
        <img src={volvoImg} alt="bus" className="w-full h-40 object-cover" />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 space-y-1">
          <span className="inline-block bg-[#065295] font-bold text-white px-2 py-1 text-xs rounded">
            {bus.busCategory}
          </span>

          <p className="text-white text-xs font-medium">
            {bus.origin} → {bus.destination}
          </p>
        </div>
      </div>

      <div className="flex justify-between text-sm items-center">
        <div>
          <p className="text-gray-600 font-medium tracking-wider">DEPARTURE</p>

          <p className="font-bold text-xl">
            {new Date(bus.departureTime).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="text-center text-gray-400">
          <span className="text-2xl text-[#005CAB]">→</span>

          <p className="text-xs">{bus.durationInMinutes} mins</p>
        </div>

        <div className="text-right">
          <p className="text-gray-600 font-medium tracking-wider">ARRIVAL</p>

          <p className="font-bold text-xl">
            {new Date(bus.arrivalTime).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="py-4">
        <p className="text-md text-slate-800">Selected Seats</p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {bookingInfo.selectedSeats.map((seat) => (
            <span
              key={seat}
              className="bg-[#ebe9e9] px-3 py-2 rounded-lg text-sm font-bold text-[#005CAB]"
            >
              {seat}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <div>
          <span className="text-slate-800 font-medium">TOTAL AMOUNT</span>

          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
        </div>

        <span className="text-2xl sm:text-3xl font-extrabold text-[#005CAB]">
          ₹{bookingInfo.totalFare.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onConfirm}
        disabled={loading}
        className="w-full py-3 sm:py-4 rounded-xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
    </div>
  );
};

export default BookingSummary;

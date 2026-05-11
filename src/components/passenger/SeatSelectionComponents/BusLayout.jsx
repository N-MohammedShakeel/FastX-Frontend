import React from "react";
import Seat from "./Seat";

export const BusLayout = ({ seats = [], onSelect, selectedSeats = [] }) => {
  return (
    <div className="bg-[#E9E8E7] border-10 border-[#E3E2E2] rounded-[40px] p-6 space-y-6 w-fit mx-auto">
      <div className="flex justify-between items-center px-2">
        <div className="w-10 h-10 border-4 border-gray-400 rounded-full opacity-50" />
        <div className="w-20 h-3 bg-gray-300 rounded-full" />
      </div>

      <div className="grid grid-cols-5 gap-4 justify-center auto-rows-min">
        {seats.map((seat, index) => (
          <Seat
            key={index}
            seat={seat}
            onSelect={onSelect}
            selectedSeats={selectedSeats}
          />
        ))}
      </div>

      <div className="w-40 h-3 bg-gray-300 rounded-full mx-auto opacity-40" />
    </div>
  );
};

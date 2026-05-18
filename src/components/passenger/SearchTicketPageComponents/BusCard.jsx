import React from "react";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus }) => {
  const navigate = useNavigate();

  const amenities = [];

  if (bus.ac) amenities.push("AC");
  if (bus.waterBottle) amenities.push("Water Bottle");
  if (bus.blanket) amenities.push("Blanket");
  if (bus.chargingPoint) amenities.push("Charging");
  if (bus.tv) amenities.push("TV");

  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-6 flex flex-col gap-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-100 text-xs px-3 py-1 rounded-full font-bold text-[#005CAB]">
                {bus.busCategory}
              </span>

              <span className="bg-slate-100 text-xs px-3 py-1 rounded-full font-semibold text-slate-700">
                {bus.ac ? "AC" : "Non-AC"} {bus.sleeper ? "Sleeper" : "Seater"}
              </span>
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              {bus.busNumber}
            </span>
          </div>

          <div>
            <h3 className="font-bold text-lg">{bus.busName}</h3>

            <p className="text-sm text-gray-500">
              {bus.origin} → {bus.destination}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.map((item) => (
              <span
                key={item}
                className="text-xs bg-slate-100 px-2 py-1 rounded-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between sm:justify-center items-center gap-8 text-center">
          <div>
            <p className="text-xl font-bold">
              {new Date(bus.departureTime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>

            <p className="text-xs text-gray-500">Departure</p>
          </div>

          <div className="text-gray-400">
            <p>→</p>

            <p className="text-xs">{bus.durationInMinutes} mins</p>
          </div>

          <div>
            <p className="text-xl font-bold">
              {new Date(bus.arrivalTime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>

            <p className="text-xs text-gray-500">Arrival</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-2">
          <div className="text-left sm:text-center lg:text-right">
            <p className="text-2xl font-bold">₹{bus.fare}</p>

            <p className="text-xs text-gray-500">
              {bus.availableSeats} seats left
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/passenger/seat-selection/${bus.busId}`, {
                state: bus,
              })
            }
            className="bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white px-5 py-2 rounded-xl text-sm font-semibold w-full sm:w-auto"
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusCard;

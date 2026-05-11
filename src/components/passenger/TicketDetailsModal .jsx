import React from "react";

const TicketDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white p-6 flex justify-between">
          <div>
            <p className="text-xs opacity-80">E-Ticket</p>
            <h2 className="text-xl font-bold">FastX Travels</h2>
          </div>

          <div className="text-right">
            <p className="text-xs opacity-80">Ticket ID</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
              FX-{booking.bookingId}23
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-[#005CAB] rounded-full"></div>
              <div className="w-0.5 h-18 bg-gray-300"></div>
              <i className="fa-solid fa-bus text-[#005CAB]"></i>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs text-gray-500">Origin</p>
                <p className="font-bold text-lg">{booking.origin}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.departureTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="font-bold text-lg">{booking.destination}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.arrivalTime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#F5F3F3] p-4 rounded-xl">
            <div>
              <p className="text-xs text-gray-500">Passenger</p>
              <p className="font-semibold"> {booking.passengerName}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Seat</p>
              <p className="font-semibold">{booking.seatNumbers?.join(", ")}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Bus No</p>
              <p className="font-semibold">{booking.busNumber}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Status</p>
              <span className="px-2 py-1 text-xs rounded-full text-black font-semibold">
                {booking.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
              <i className="fa-solid fa-qrcode text-4xl text-gray-500"></i>
            </div>
            <p className="text-xs text-gray-500">
              Show this QR during boarding
            </p>
          </div>
        </div>

        <div className="p-6 flex gap-4 border-t">
          <button className="flex-1 py-3 rounded-xl bg-[#005CAB] text-white font-bold">
            Download
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;

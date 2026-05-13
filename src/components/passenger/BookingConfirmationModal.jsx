import React, { useState } from "react";
import TicketDetailsModal from "./TicketDetailsModal ";

const BookingConfirmationModal = ({ isOpen, onClose, booking }) => {
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  if (!isOpen || !booking) return null;

  const handleView = () => {
    setIsTicketOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xl">
        <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden">
          <div className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <i className="fa-solid fa-check text-white text-xl"></i>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold font-sans text-[#1B1C1C]">
                Booking Confirmed!
              </h2>
              <p className="text-sm text-[#525F71]">
                Your ticket has been successfully booked.
              </p>
            </div>
          </div>

          <div className="mx-6 mb-6 rounded-2xl overflow-hidden shadow">
            <div className="bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white p-6 flex">
              <div>
                <p className="text-xs uppercase opacity-80">Bus</p>
                <h3 className="text-xl font-bold">{booking.busName}</h3>
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center relative">
                  <div className="w-4 h-4 bg-[#005CAB] rounded-full border-2 border-white shadow-[0_0_0_4px_#D5E3FF]" />
                  <div className="w-0.5 h-17 bg-slate-300 opacity-50"></div>
                  <div className="text-[#005CAB] text-sm">
                    <i className="fa-solid fa-bus"></i>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-700">
                      Origin
                    </p>
                    <p className="text-lg font-bold text-[#1B1C1C]">
                      {booking.origin}
                    </p>
                    <p className="text-sm text-slate-500">
                      Departure:{" "}
                      {new Date(booking.departureTime).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-700">
                      Destination
                    </p>
                    <p className="text-lg font-bold text-[#1B1C1C]">
                      {booking.destination}
                    </p>
                    <p className="text-sm text-slate-500">
                      Arrival:{" "}
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

              <div className="bg-[#F5F3F3] rounded-xl p-4 space-y-4">
                <div>
                  <p className="text-xs uppercase text-gray-500">Passenger</p>
                  <p className="font-semibold">{booking.passengerName}</p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500">Seats</p>
                  <p className="font-semibold">
                    {booking.seatNumbers?.join(", ") || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500">Bus No</p>
                  <p className="font-semibold">{booking.busNumber}</p>
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-sm">Total</span>
                  <span className="text-xl font-bold text-[#005CAB]">
                    ₹{booking.totalFare}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 flex gap-4">
            <button
              onClick={handleView}
              className="flex-1 py-3 rounded-xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold"
            >
              View Ticket
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
      <TicketDetailsModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        booking={booking}
      />
    </>
  );
};

export default BookingConfirmationModal;

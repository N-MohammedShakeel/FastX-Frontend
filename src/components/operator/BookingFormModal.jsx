import React from "react";

import {
  FaBus,
  FaUser,
  FaMapMarkerAlt,
  FaChair,
  FaClock,
  FaTicketAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const BookingFormModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#FBF9F9] rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Booking Details
            </h2>

            <p className="text-slate-500 mt-1">
              Manage passenger booking information
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
          >
            close
          </button>
        </div>

        <div className="p-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Passenger Info
              </h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaUser className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Passenger</p>
                  <p className="font-bold text-slate-900">
                    {booking.passengerName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaTicketAlt className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Booking ID</p>
                  <p className="font-bold text-slate-900">
                    BK-{booking.bookingId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-emerald-500" />

                <div>
                  <p className="text-sm text-slate-400">Total Fare</p>
                  <p className="font-bold text-slate-900">
                    ₹{booking.totalFare}
                  </p>
                </div>
              </div>

              <div>
                <span
                  className={`px-4 py-2 rounded-full text-xs font-bold ${getStatusColor(
                    booking.status,
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Journey Details
              </h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaBus className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Bus</p>
                  <p className="font-bold text-slate-900">{booking.busName}</p>
                  <p className="text-sm text-slate-500">{booking.busNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Route</p>
                  <p className="font-bold text-slate-900">
                    {booking.origin} → {booking.destination}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Departure</p>
                  <p className="font-bold text-slate-900">
                    {new Date(booking.departureTime).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaChair className="text-[#005CAB]" />

                <div>
                  <p className="text-sm text-slate-400">Seats</p>
                  <p className="font-bold text-slate-900">
                    {booking.seatNumbers?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;

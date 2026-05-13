import React from "react";
import QRCode from "react-qr-code";

const ETicket = ({ booking, ref }) => {
  if (!booking) return null;

  const qrValue = `ID:${booking.bookingId}|P:${booking.passengerName}|S:${booking.seatNumbers?.join(",")}`;

  return (
    <div
      ref={ref}
      className="bg-white p-8 w-200 border border-gray-200 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <h1 className="text-9xl font-black -rotate-45">FASTX TRAVELS</h1>
      </div>

      <div className="bg-[#005CAB] text-white p-6 flex justify-between items-end rounded-t-lg">
        <div>
          <h2 className="text-3xl font-black italic">FASTX</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-80">
            Electronic Ticket / Boarding Pass
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-70 uppercase font-bold">
            Booking ID
          </p>
          <p className="text-xl font-mono font-bold uppercase">
            FX-{booking.bookingId}
          </p>
        </div>
      </div>

      <div className="flex border-b border-dashed border-gray-300 bg-white relative">
        <div className="flex-1 p-8 border-r border-dashed border-gray-200">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">
                Departure
              </p>
              <h3 className="text-3xl font-black text-gray-800">
                {booking.origin}
              </h3>
              <p className="text-sm font-bold text-[#005CAB]">
                {new Date(booking.departureTime).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-center px-4 flex-1">
              <div className="w-full flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#005CAB]"></div>
                <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
                <i className="fa-solid fa-bus text-[#005CAB] text-xs"></i>
                <div className="flex-1 h-px border-t border-dashed border-gray-300"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-[#005CAB]"></div>
              </div>
              <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">
                {booking.busName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase font-bold">
                Arrival
              </p>
              <h3 className="text-3xl font-black text-gray-800">
                {booking.destination}
              </h3>
              <p className="text-sm font-semibold text-gray-500 italic">
                Est. {new Date(booking.arrivalTime).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">
                Passenger
              </p>
              <p className="text-lg font-bold uppercase">
                {booking.passengerName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase font-bold">
                Seat(s)
              </p>
              <p className="text-lg font-bold text-[#005CAB]">
                {booking.seatNumbers?.join(", ")}
              </p>
            </div>
          </div>
        </div>

        <div className="w-64 bg-gray-50 p-8 flex flex-col items-center justify-center">
          <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
            <QRCode.default value={qrValue} size={100} />
          </div>
          <p className="text-[10px] font-black uppercase mt-3 text-gray-400 tracking-tighter">
            Scan for Validation
          </p>
        </div>
      </div>

      <div className="p-8 flex justify-between items-center">
        <div className="max-w-md">
          <h4 className="text-xs font-bold uppercase mb-2">
            Important Information
          </h4>
          <p className="text-[9px] text-gray-500 leading-relaxed italic">
            * Please report at the boarding point 30 minutes before departure.
            Carry a valid Govt. ID. This e-ticket is non-transferable.
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-medium italic text-gray-700">
            Have a safe journey!
          </h3>
          <p className="text-[10px] text-gray-400 mt-1">
            Thank you for choosing FastX Travels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ETicket;

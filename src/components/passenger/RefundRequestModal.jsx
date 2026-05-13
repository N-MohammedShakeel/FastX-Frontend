import React, { useState } from "react";

const RefundRequestModal = ({ isOpen, onClose, onConfirmRefund, booking }) => {
  const [reason, setReason] = useState("");

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Request Refund</h2>
          <p className="text-sm text-gray-500">
            Cancel your ticket and initiate refund
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center bg-[#F5F3F3] rounded-xl p-4">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <p className="font-bold">{booking.origin}</p>
              <p className="text-sm text-gray-500">{booking.departureTime}</p>
            </div>

            <div className="flex items-center w-32 gap-2">
              <div className="w-full border-t-2 border-dashed border-gray-300"></div>
              <i className="fa-solid fa-bus text-[#005CAB] mt-1"></i>
              <div className="w-full border-t-2 border-dashed border-gray-300"></div>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">To</p>
              <p className="font-bold">{booking.destination}</p>
              <p className="text-sm text-gray-500">{booking.arrivalTime}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Reason for Refund
            </label>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-2 h-12 rounded-xl border border-slate-200 px-4 focus:border-[#005CAB] outline-none"
            >
              <option value="">Select reason</option>
              <option>Change of Plans</option>
              <option>Medical Emergency</option>
              <option>Operator Issue</option>
            </select>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-600">
            Refund will be processed within 3–5 business days.
          </div>

          <div className="border rounded-xl p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Fare Paid</span>
              <span>₹{booking.totalFare}</span>
            </div>

            <div className="flex justify-between">
              <span>Cancellation Fee</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between font-bold text-[#005CAB] text-lg">
              <span>Refund</span>
              <span>₹{booking.totalFare}</span>
            </div>
          </div>
        </div>

        <div className="p-6 flex gap-4 border-t">
          <button
            onClick={onConfirmRefund}
            className="flex-1 py-3 rounded-xl bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold"
          >
            Confirm Refund
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundRequestModal;

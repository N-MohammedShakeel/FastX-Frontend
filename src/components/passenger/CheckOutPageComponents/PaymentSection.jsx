import React from "react";

const PaymentSection = ({ balance, total }) => {
  const hasBalance = balance >= (total || 0);

  return (
    <div className="bg-[#F5F3F3] p-8 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Wallet Payment</h3>

          <p className="text-sm text-slate-500">
            Secure payment using FastX wallet
          </p>
        </div>

        <div className="bg-white px-4 py-3 rounded-xl shadow-sm">
          <p className="text-xs text-slate-500">Available Balance</p>

          <p className="text-2xl font-bold text-[#005CAB]">
            ₹{Number(balance || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D5E3FF] flex items-center justify-center">
              <i className="fa-solid fa-wallet text-[#005CAB]"></i>
            </div>

            <div>
              <p className="font-bold">FastX Wallet</p>

              <p className="text-sm text-slate-500">Instant secure payment</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Amount Payable</p>

            <p className="font-bold text-xl">
              ₹{Number(total || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {!hasBalance && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm">
            Insufficient wallet balance.
          </div>
        )}

        {hasBalance && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
            Wallet balance available for this booking.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;

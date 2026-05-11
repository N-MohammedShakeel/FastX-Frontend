import React from "react";
import { FaWallet } from "react-icons/fa";

const WalletD1 = ({ balance }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 lg:p-5 flex items-center gap-3 sm:gap-4">
      <div className="bg-blue-100 text-blue-700 p-2 sm:p-3 rounded-full">
        <FaWallet className="text-sm sm:text-base" />
      </div>

      <div>
        <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">
          Wallet Balance
        </p>

        <p className="text-base sm:text-lg font-bold text-slate-900">
          ₹{balance?.toFixed(2) || "0.00"}
        </p>
      </div>
    </div>
  );
};

export default WalletD1;

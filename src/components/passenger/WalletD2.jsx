import React from "react";
import { FaWallet } from "react-icons/fa";

const WalletD2 = () => {
  return (
    <>
      <div className="bg-[#0075D7] text-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
        <div className="bg-white/20 p-3 rounded-lg">
          <FaWallet />
        </div>
        <div>
          <p className="text-xs uppercase opacity-80">Wallet Balance</p>
          <p className="text-2xl font-extrabold">12,450</p>
        </div>
      </div>
    </>
  );
};

export default WalletD2;

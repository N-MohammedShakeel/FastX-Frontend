import React, { useState } from "react";
import { FaWallet, FaPlus } from "react-icons/fa";

const WalletD2 = ({ balance, onAddMoney }) => {
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white rounded-2xl p-4 shadow-lg w-full max-w-min lg:max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 ">
          <div className="bg-white/20 p-2 rounded-xl text-lg">
            <FaWallet />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-semibold">
              Wallet Balance
            </p>

            <h2 className="text-xl font-black mt-0.5">
              ₹{Number(balance || 0).toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
          FASTX WALLET
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="flex-1 h-8 rounded-xl px-3 bg-white text-slate-800 outline-none text-sm"
        />

        <button
          onClick={() => {
            if (!amount || amount <= 0) return;

            onAddMoney(Number(amount));
            setAmount("");
          }}
          className="h-8 px-4 rounded-xl bg-white text-[#005CAB] font-bold flex items-center justify-center gap-2 text-sm hover:scale-[1.02] transition"
        >
          <FaPlus className="text-xs" />
          Add
        </button>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {[100, 500, 1000, 2000].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-semibold transition"
          >
            ₹{amt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletD2;

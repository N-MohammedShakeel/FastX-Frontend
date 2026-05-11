import React from "react";

const ContactCard = () => {
  return (
    <>
      <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] text-white rounded-2xl p-6">
        <h4 className="font-bold text-lg">Need help?</h4>
        <p className="text-sm text-slate-400 mt-2">
          Our team is available 24/7 to assist with your bookings and account.
        </p>

        <button className="mt-4 text-blue-300 font-semibold flex items-center gap-2">
          Contact Support →
        </button>
      </div>
    </>
  );
};

export default ContactCard;

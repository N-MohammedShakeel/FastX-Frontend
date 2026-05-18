import React from "react";

const StatCard = ({ title, value, footer, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-start">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <div className={`text-lg ${iconColor}`}>{icon}</div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h2 className="text-4xl font-bold mt-2 text-slate-900">{value}</h2>
        <p className="text-[10px] tracking-[2px] text-slate-400 mt-3 uppercase">
          {footer}
        </p>
      </div>
    </div>
  );
};

export default StatCard;

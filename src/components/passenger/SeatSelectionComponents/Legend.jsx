import React from "react";

export const Legend = () => (
  <div className="flex gap-6 bg-[#F5F3F3] px-6 py-3 rounded-full w-fit mx-auto">
    <LegendItem color="bg-green-600" label="Available" />
    <LegendItem color="bg-[#005CAB]" label="Selected" />
    <LegendItem color="bg-gray-300" label="Booked" />
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 text-sm font-medium">
    <div className={`w-4 h-4 rounded ${color}`} />
    {label}
  </div>
);

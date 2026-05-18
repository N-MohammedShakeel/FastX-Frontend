import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EarningsChart = ({ bookings }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const revenueMap = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  bookings?.forEach((booking) => {
    if (booking.status === "CONFIRMED") {
      const day = days[new Date(booking.bookingTime).getDay()];
      revenueMap[day] += booking.totalFare;
    }
  });

  const data = days.map((day) => ({
    day,
    revenue: revenueMap[day],
  }));

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Daily Revenue</h2>
        <p className="text-slate-500 text-sm mt-1">
          Total fleet earnings per day
        </p>
      </div>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#005CAB"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;

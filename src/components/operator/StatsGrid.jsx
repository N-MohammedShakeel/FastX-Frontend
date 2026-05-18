import React from "react";

import { FaBus, FaRoute, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";

import StatCard from "../common/StatCard";

const StatsGrid = ({ stats }) => {
  const statItems = [
    {
      title: "Total Fleet",
      value: stats?.totalBus || 0,
      footer: "ACTIVE UNITS",
      icon: <FaBus />,
      iconBg: "bg-blue-100",
      iconColor: "text-[#005CAB]",
    },

    {
      title: "Active Routes",
      value: stats?.totalRoute || 0,
      footer: "INTER-CITY NETWORK",
      icon: <FaRoute />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-700",
    },

    {
      title: "Total Bookings",
      value: stats?.totalBooking || 0,
      footer: "TOTAL BOOKINGS",
      icon: <FaTicketAlt />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },

    {
      title: "Refunds",
      value: `₹${stats?.totalAmountRefunded || 0}`,
      footer: "APPROVED REFUNDS",
      icon: <FaMoneyBillWave />,
      iconBg: "bg-red-100",
      iconColor: "text-red-700",
    },
  ];

  return (
    <>
      {statItems.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </>
  );
};

export default StatsGrid;

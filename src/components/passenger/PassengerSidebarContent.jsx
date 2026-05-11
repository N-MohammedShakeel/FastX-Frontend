import React from "react";
import {
  FaHome,
  FaSearch,
  FaTicketAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export const PassengerSidebarContent = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/passenger-dashboard" },
    { name: "Find Trips", icon: <FaSearch />, path: "/search" },
    { name: "Bookings", icon: <FaTicketAlt />, path: "/bookings" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div className="px-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Menu
          </h2>
        </div>

        <nav className="flex flex-col gap-1">
          {menu.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={i}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition
                  ${
                    isActive
                      ? "bg-blue-50 text-[#005CAB]"
                      : "text-slate-500 hover:bg-slate-100"
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-[15px] font-medium">{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div
          onClick={() => navigate("/signin")}
          className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
        >
          <FaSignOutAlt />
          <span className="text-[15px] font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

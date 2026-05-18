import React from "react";

import {
  FaHome,
  FaUsers,
  FaBus,
  FaRoute,
  FaTicketAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebarContent = ({ onClose }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);

    if (onClose) onClose();
  };

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin-dashboard",
    },

    {
      name: "Passengers",
      icon: <FaUsers />,
      path: "/admin/passengers",
    },

    {
      name: "Operators",
      icon: <FaBus />,
      path: "/admin/operators",
    },

    {
      name: "Bookings",
      icon: <FaTicketAlt />,
      path: "/admin/bookings",
    },

    {
      name: "Routes",
      icon: <FaRoute />,
      path: "/admin/routes",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");

    navigate("/signin");
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-6">
        <div className="px-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            ADMIN PANEL
          </h2>
        </div>

        <nav className="flex flex-col gap-1">
          {menu.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={i}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
                
                ${
                  isActive
                    ? "bg-blue-50 text-[#005CAB] shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
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
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer"
        >
          <FaSignOutAlt />
          <span className="text-[15px] font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarContent;

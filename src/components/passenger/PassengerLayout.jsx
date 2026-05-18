import React, { useState } from "react";

import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import { PassengerSidebarContent } from "./PassengerSidebarContent";

const PassengerLayout = ({ children, mainClassName = "" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <PassengerSidebarContent onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        <main className={`flex-1 ${mainClassName}`}>{children}</main>
      </div>
    </div>
  );
};

export default PassengerLayout;

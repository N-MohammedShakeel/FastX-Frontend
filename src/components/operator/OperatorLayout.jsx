import React, { useState } from "react";

import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

import OperatorSidebarContent from "./OperatorSidebarContent";

const OperatorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen] bg-white">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <OperatorSidebarContent onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        <main className="flex-1 p-6 lg:p-10 max-w-400 mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OperatorLayout;

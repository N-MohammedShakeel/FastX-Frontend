import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import { FaUser, FaLock, FaPlus } from "react-icons/fa";
import WalletD2 from "../../components/passenger/WalletD2";
import ContactCard from "../../components/passenger/ContactCard";
import { PassengerSidebarContent } from "../../components/passenger/PassengerSidebarContent";

export default function UserProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F9]">
      <Navbar />

      <div className="lg:hidden flex items-center justify-between px-4 py-3 mt-5">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col gap-1"
        >
          <span className="w-8 h-1 bg-[#005CAB]"></span>
          <span className="w-6 h-1 bg-[#005CAB]"></span>
          <span className="w-8 h-1 bg-[#005CAB]"></span>
        </button>

        <div className="w-5"></div>
      </div>

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
          <PassengerSidebarContent onClose={() => setIsSidebarOpen(false)} />
        </Sidebar>

        <main className="flex-1 p-6 lg:p-12">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-sans">
                Account Profile
              </h1>
              <p className="text-[#404754] mt-2 max-w-md">
                Manage your personal details and account settings
              </p>
            </div>

            <WalletD2 />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#F5F3F3] rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg flex gap-2 items-center">
                    <i className="fa-solid fa-user text-[#005CAB]"></i>
                    Personal Details
                  </h3>
                  <button className="text-[#005CAB] font-semibold text-sm">
                    Edit
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold">
                      Full Name
                    </p>
                    <p className="font-semibold">Alex Thompson</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold">
                      Email Address
                    </p>
                    <p className="font-semibold">alex.thompson@example.com</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold">
                      Phone Number
                    </p>
                    <p className="font-semibold">+1 (555) 234-8901</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold">
                      Date of Birth
                    </p>
                    <p className="font-semibold">May 14, 1992</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F3F3] rounded-2xl p-6 space-y-6">
                <h3 className="font-bold text-lg">Saved Addresses</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <span className="bg-blue-100 text-xs px-3 py-1 rounded-full font-bold">
                      Home
                    </span>
                    <p className="mt-3 text-sm font-semibold">
                      1248 Oakwood Ave, Apt 4B New York, NY
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <span className="bg-red-100 text-xs px-3 py-1 rounded-full font-bold">
                      Office
                    </span>
                    <p className="mt-3 text-sm font-semibold">
                      88 World Trade Center Floor 42, NY
                    </p>
                  </div>
                </div>

                <button className="w-full border-2 border-dashed rounded-xl py-4 flex items-center justify-center gap-2 text-slate-600 font-semibold">
                  <FaPlus /> Add New Address
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <FaLock className="text-[#005CAB]" /> Security
                </h3>

                <div className="space-y-4">
                  <label className="tracking-widest text-xs uppercase text-slate-400 font-bold m-2">
                    CURRENT PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full p-3 bg-[#F5F3F3] rounded-xl"
                  />

                  <label className="tracking-widest text-xs uppercase text-slate-400 font-bold m-2">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-3 bg-[#F5F3F3] rounded-xl"
                  />

                  <label className="tracking-widest text-xs uppercase text-slate-400 font-bold m-2">
                    CONFIRM NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 bg-[#F5F3F3] rounded-xl"
                  />

                  <button className="w-full h-12 bg-linear-to-r from-[#005CAB] to-[#0075D7] text-white font-bold rounded-xl">
                    Update Password
                  </button>
                </div>
              </div>

              <ContactCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

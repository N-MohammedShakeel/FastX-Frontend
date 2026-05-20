import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaWallet,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import TableLayout from "../../components/common/TableLayout";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import StatCard from "../../components/common/StatCard";

import {
  fetchPassengers,
  removePassenger,
} from "../../store/admin/admin-actions";

const AdminPassengerManagement = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);

  const passengers = useSelector((state) => state.adminPassenger.passengers);
  const loading = useSelector((state) => state.adminPassenger.loading);
  const error = useSelector((state) => state.adminPassenger.error);

  useEffect(() => {
    dispatch(fetchPassengers());
  }, [dispatch]);

  const filteredPassengers = useMemo(() => {
    return passengers.filter(
      (passenger) =>
        passenger.name?.toLowerCase().includes(search.toLowerCase()) ||
        passenger.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [passengers, search]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredPassengers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPassengers = filteredPassengers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDeleteClick = (passenger) => {
    setSelectedPassenger(passenger);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(removePassenger(selectedPassenger.id));
    setIsDeleteOpen(false);
    setSelectedPassenger(null);
  };

  const totalWalletBalance = passengers.reduce(
    (sum, passenger) => sum + passenger.wallet,
    0,
  );

  const googleUsers = passengers.filter(
    (passenger) => passenger.provider === "GOOGLE",
  ).length;

  const localUsers = passengers.filter(
    (passenger) => passenger.provider === "LOCAL",
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Passenger Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage passengers, wallet balances, and account details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Passengers"
            value={passengers.length}
            footer="Registered Accounts"
            icon={<FaUsers />}
            iconBg="bg-blue-50"
            iconColor="text-[#005CAB]"
          />

          <StatCard
            title="Wallet Balance"
            value={`₹${totalWalletBalance.toLocaleString()}`}
            footer="Combined Passenger Wallets"
            icon={<FaWallet />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Google Users"
            value={googleUsers}
            footer="OAuth Registered"
            icon={<FaUsers />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
          />

          <StatCard
            title="Local Users"
            value={localUsers}
            footer="Manual Registrations"
            icon={<FaUsers />}
            iconBg="bg-slate-100"
            iconColor="text-slate-700"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredPassengers.length} passengers found
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading passengers..." />
        ) : (
          <TableLayout
            title="Registered Passengers"
            subtitle="Manage passenger accounts and activities"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredPassengers.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedPassengers.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Passenger</th>
                  <th className="text-left px-6 py-4">Contact</th>
                  <th className="text-left px-6 py-4">Gender</th>
                  <th className="text-left px-6 py-4">Wallet</th>
                  <th className="text-left px-6 py-4">Provider</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedPassengers.map((passenger) => (
                  <tr
                    key={passenger.id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {passenger.name}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {passenger.address}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                          <FaEnvelope className="text-slate-400" />

                          {passenger.email}
                        </div>

                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                          <FaPhone className="text-slate-400" />

                          {passenger.phone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#005CAB] text-xs font-bold">
                        {passenger.gender}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FaWallet className="text-emerald-500" />₹
                        {passenger.wallet.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        
                        ${
                          passenger.provider === "GOOGLE"
                            ? "bg-red-100 text-red-600"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {passenger.provider}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            passenger.active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                      >
                        {passenger.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleDeleteClick(passenger)}
                        className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableLayout>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Passenger"
        description={`Are you sure you want to delete ${selectedPassenger?.name}?`}
      />
    </AdminLayout>
  );
};

export default AdminPassengerManagement;

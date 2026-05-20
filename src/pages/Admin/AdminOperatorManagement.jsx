import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaWallet,
  FaBus,
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
  fetchOperators,
  removeOperator,
} from "../../store/admin/admin-actions";

const AdminOperatorManagement = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const operators = useSelector((state) => state.adminOperator.operators);
  const loading = useSelector((state) => state.adminOperator.loading);
  const error = useSelector((state) => state.adminOperator.error);

  useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);

  const filteredOperators = useMemo(() => {
    return operators.filter(
      (operator) =>
        operator.name?.toLowerCase().includes(search.toLowerCase()) ||
        operator.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [operators, search]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOperators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOperators = filteredOperators.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDeleteClick = (operator) => {
    setSelectedOperator(operator);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(removeOperator(selectedOperator.id));
    setIsDeleteOpen(false);
    setSelectedOperator(null);
  };

  const totalWalletBalance = operators.reduce(
    (sum, operator) => sum + operator.wallet,
    0,
  );

  const totalFleet = operators.reduce(
    (sum, operator) => sum + (operator.buses?.length || 0),
    0,
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Operator Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage bus operators, fleet accounts, and wallet balances.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-6">
          <StatCard
            title="Total Operators"
            value={operators.length}
            footer="Registered Operators"
            icon={<FaUsers />}
            iconBg="bg-blue-50"
            iconColor="text-[#005CAB]"
          />

          <StatCard
            title="Fleet Size"
            value={totalFleet}
            footer="Registered Buses"
            icon={<FaBus />}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />

          <StatCard
            title="Wallet Balance"
            value={`₹${totalWalletBalance.toLocaleString()}`}
            footer="Combined Operator Wallets"
            icon={<FaWallet />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by operator or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredOperators.length} operators found
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading operators..." />
        ) : (
          <TableLayout
            title="Registered Operators"
            subtitle="Manage operator accounts and fleet activities"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredOperators.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedOperators.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Operator</th>
                  <th className="text-left px-6 py-4">Contact</th>
                  <th className="text-left px-6 py-4">Fleet</th>
                  <th className="text-left px-6 py-4">Wallet</th>
                  <th className="text-left px-6 py-4">Provider</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedOperators.map((operator) => (
                  <tr
                    key={operator.id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {operator.name}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {operator.address}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                          <FaEnvelope className="text-slate-400" />

                          {operator.email}
                        </div>

                        <div className="flex items-center gap-2 text-slate-700 text-sm">
                          <FaPhone className="text-slate-400" />

                          {operator.phone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <FaBus className="text-[#005CAB]" />
                        {operator.buses?.length || 0} Buses
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <FaWallet className="text-emerald-500" />₹
                        {operator.wallet.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        
                        ${
                          operator.provider === "GOOGLE"
                            ? "bg-red-100 text-red-600"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {operator.provider}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            operator.active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                      >
                        {operator.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleDeleteClick(operator)}
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
        title="Delete Operator"
        description={`Are you sure you want to delete ${selectedOperator?.name}?`}
      />
    </AdminLayout>
  );
};

export default AdminOperatorManagement;
``;

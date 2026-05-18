import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import OperatorLayout from "../../components/operator/OperatorLayout";
import TableLayout from "../../components/common/TableLayout";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import {
  createBus,
  editBus,
  fetchOperatorBuses,
  fetchRoutesAction,
  removeBus,
} from "../../store/operator/operator-actions";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import BusFormModal from "../../components/operator/BusFormModal";
import { toast } from "react-toastify";

const OperatorBusManagement = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  const buses = useSelector((state) => state.operatorBus.buses);
  const routes = useSelector((state) => state.operatorRoute.routes);

  const loading = useSelector((state) => state.operatorBus.loading);
  const error = useSelector((state) => state.operatorBus.error);

  useEffect(() => {
    dispatch(fetchOperatorBuses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoutesAction());
  }, [dispatch]);

  const filteredBuses = useMemo(() => {
    return buses.filter(
      (bus) =>
        bus.name?.toLowerCase().includes(search.toLowerCase()) ||
        bus.busNumber?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [buses, search]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredBuses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBuses = filteredBuses.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDeleteClick = (bus) => {
    setSelectedBus(bus);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeBus(selectedBus.busId));
    setIsDeleteOpen(false);
  };

  const handleOpenCreateModal = () => {
    const availableRoutes = routes.filter((route) => !route.assigned);

    if (availableRoutes.length === 0) {
      toast.info("Please add an unassigned route first");
      return;
    }

    setEditingBus(null);
    setIsBusModalOpen(true);
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setIsBusModalOpen(true);
  };

  const handleSaveBus = async (formData) => {
    if (editingBus) {
      await dispatch(editBus(editingBus.busId, formData));
    } else {
      await dispatch(createBus(formData));
    }

    setIsBusModalOpen(false);
    setEditingBus(null);
  };

  return (
    <OperatorLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Fleet Management
            </h1>

            <p className="text-slate-500 mt-2">
              Manage buses, routes, pricing, and seat availability.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="h-12 px-5 rounded-2xl bg-[#005CAB] hover:bg-[#004b96] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition"
          >
            <FaPlus className="text-sm" />
            Register Bus
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by bus name or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredBuses.length} buses found
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading buses..." />
        ) : (
          <TableLayout
            title="Registered Fleet"
            subtitle="Manage and monitor your active buses"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredBuses.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedBuses.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Bus</th>
                  <th className="text-left px-6 py-4">Category</th>
                  <th className="text-left px-6 py-4">Route</th>
                  <th className="text-left px-6 py-4">Fare</th>
                  <th className="text-left px-6 py-4">Seats Left</th>
                  <th className="text-left px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedBuses.length > 0 ? (
                  paginatedBuses.map((bus) => (
                    <tr
                      key={bus.busId}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="px-8 py-5">
                        <div>
                          <p className="font-bold text-slate-900">{bus.name}</p>

                          <p className="text-sm text-slate-400 mt-1">
                            {bus.busNumber}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#005CAB] text-xs font-bold">
                          {bus.busCategory}
                        </span>
                      </td>

                      <td className="px-6 py-5 font-semibold text-slate-700">
                        {bus.origin} → {bus.destination}
                      </td>

                      <td className="px-6 py-5 font-bold text-slate-900">
                        ₹{bus.fare}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold

                          ${
                            bus.seatsLeft > 10
                              ? "text-green-700"
                              : bus.seatsLeft > 0
                                ? "text-yellow-700"
                                : "text-red-700"
                          }`}
                        >
                          {bus.seatsLeft} Seats
                        </span>
                      </td>

                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEditBus(bus)}
                            className="w-10 h-10 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center transition"
                          >
                            <FaEdit className="text-sm" />
                          </button>

                          <button
                            onClick={() => handleDeleteClick(bus)}
                            className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-20 text-slate-400"
                    >
                      No buses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </>
          </TableLayout>
        )}
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Bus"
        description={`Are you sure you want to delete ${selectedBus?.name}? This action cannot be undone.`}
      />
      <BusFormModal
        isOpen={isBusModalOpen}
        onClose={() => {
          setIsBusModalOpen(false);
          setEditingBus(null);
        }}
        onSave={handleSaveBus}
        loading={loading}
        bus={editingBus}
        routes={routes.filter(
          (route) => !route.assigned || route.routeId === editingBus?.routeId,
        )}
      />
    </OperatorLayout>
  );
};

export default OperatorBusManagement;

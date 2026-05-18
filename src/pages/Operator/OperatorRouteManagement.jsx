import React, { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaRoute,
  FaClock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import OperatorLayout from "../../components/operator/OperatorLayout";
import TableLayout from "../../components/common/TableLayout";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import {
  createRoute,
  editRoute,
  fetchRoutesAction,
  removeRoute,
} from "../../store/operator/operator-actions";
import RouteFormModal from "../../components/operator/RouteFormModal";

const OperatorRouteManagement = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const loading = useSelector((state) => state.operatorRoute.loading);
  const routes = useSelector((state) => state.operatorRoute.routes);

  useEffect(() => {
    dispatch(fetchRoutesAction());
  }, [dispatch]);

  const filteredRoutes = useMemo(() => {
    return routes.filter(
      (route) =>
        route.origin.toLowerCase().includes(search.toLowerCase()) ||
        route.destination.toLowerCase().includes(search.toLowerCase()),
    );
  }, [routes, search]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoutes = filteredRoutes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDeleteClick = (route) => {
    setSelectedRoute(route);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(removeRoute(selectedRoute.routeId));

    setIsDeleteOpen(false);
    setSelectedRoute(null);
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setIsRouteModalOpen(true);
  };

  const handleCreateRoute = () => {
    setEditingRoute(null);
    setIsRouteModalOpen(true);
  };

  const handleSaveRoute = async (formData) => {
    if (editingRoute) {
      await dispatch(editRoute(editingRoute.routeId, formData));
    } else {
      await dispatch(createRoute(formData));
    }

    setIsRouteModalOpen(false);
    setEditingRoute(null);
  };

  return (
    <>
      <OperatorLayout>
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Route Management
              </h1>

              <p className="text-slate-500 mt-2">
                Create and manage travel routes for your fleet operations.
              </p>
            </div>

            <button
              onClick={handleCreateRoute}
              className="h-12 px-5 rounded-2xl bg-[#005CAB] hover:bg-[#004b96] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition"
            >
              <FaPlus className="text-sm" />
              Add Route
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

              <input
                type="text"
                placeholder="Search by origin or destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
              />
            </div>

            <p className="text-sm text-slate-500 font-medium">
              {filteredRoutes.length} routes found
            </p>
          </div>

          <TableLayout
            title="Available Routes"
            subtitle="Manage route schedules and assignments"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredRoutes.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedRoutes.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Route</th>
                  <th className="text-left px-6 py-4">Departure</th>
                  <th className="text-left px-6 py-4">Duration</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-8 py-4">Bus</th>
                  <th className="text-left px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedRoutes.map((route) => (
                  <tr
                    key={route.routeId}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005CAB] flex items-center justify-center">
                          <FaRoute />
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            {route.origin} → {route.destination}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            Route FX-{route.routeId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {new Date(route.departureTime).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {new Date(route.departureTime).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <FaClock className="text-slate-400 text-sm" />
                        {route.durationInMinutes} mins
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        
                        ${
                          route.assigned
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {route.assigned ? "Assigned" : "Unassigned"}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      {route.assigned ? (
                        <div>
                          <p className="font-semibold text-slate-800">
                            {route.busName}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {route.busNumber}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">
                          Not Assigned
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(route)}
                          className="w-10 h-10 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center transition"
                        >
                          <FaEdit className="text-sm" />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(route)}
                          className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableLayout>
        </div>
      </OperatorLayout>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Route"
        description={`Are you sure you want to delete the route from ${selectedRoute?.origin} to ${selectedRoute?.destination}?`}
      />
      <RouteFormModal
        isOpen={isRouteModalOpen}
        onClose={() => {
          setIsRouteModalOpen(false);
          setEditingRoute(null);
        }}
        onSave={handleSaveRoute}
        loading={loading}
        route={editingRoute}
      />
    </>
  );
};

export default OperatorRouteManagement;

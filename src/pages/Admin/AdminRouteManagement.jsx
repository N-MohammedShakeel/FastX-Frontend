import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaRoute,
  FaClock,
  FaBus,
  FaUserTie,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import TableLayout from "../../components/common/TableLayout";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import StatCard from "../../components/common/StatCard";

import {
  fetchAdminRoutes,
  removeAdminRoute,
} from "../../store/admin/admin-actions";

const AdminRouteManagement = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const routes = useSelector((state) => state.adminRoute.routes);
  const loading = useSelector((state) => state.adminRoute.loading);
  const error = useSelector((state) => state.adminRoute.error);

  useEffect(() => {
    dispatch(fetchAdminRoutes());
  }, [dispatch]);

  const filteredRoutes = useMemo(() => {
    return routes.filter(
      (route) =>
        route.origin?.toLowerCase().includes(search.toLowerCase()) ||
        route.destination?.toLowerCase().includes(search.toLowerCase()) ||
        route.operatorName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [routes, search]);

  const itemsPerPage = 5;
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

  const handleConfirmDelete = async () => {
    await dispatch(removeAdminRoute(selectedRoute.routeId));
    setIsDeleteOpen(false);
    setSelectedRoute(null);
  };

  const assignedRoutes = routes.filter((route) => route.assigned).length;
  const unassignedRoutes = routes.filter((route) => !route.assigned).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Route Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor and manage all available travel routes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Total Routes"
            value={routes.length}
            footer="Available Routes"
            icon={<FaRoute />}
            iconBg="bg-blue-50"
            iconColor="text-[#005CAB]"
          />

          <StatCard
            title="Assigned"
            value={assignedRoutes}
            footer="Routes In Service"
            icon={<FaCheckCircle />}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />

          <StatCard
            title="Unassigned"
            value={unassignedRoutes}
            footer="Waiting For Bus"
            icon={<FaTimesCircle />}
            iconBg="bg-yellow-50"
            iconColor="text-yellow-600"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by route or operator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredRoutes.length} routes found
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading routes..." />
        ) : (
          <TableLayout
            title="Available Routes"
            subtitle="Track route assignments and operator activity"
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
                  <th className="text-left px-6 py-4">Bus</th>
                  <th className="text-left px-6 py-4">Operator</th>
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
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <FaRoute className="text-[#005CAB]" />
                          {route.origin} → {route.destination}
                        </div>

                        <p className="text-sm text-slate-400">
                          RT-{route.routeId}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-800 font-semibold">
                          <FaMapMarkerAlt className="text-[#005CAB]" />

                          {new Date(route.departureTime).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>

                        <p className="text-sm text-slate-500">
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
                      <div className="flex items-center gap-2 font-semibold text-slate-800">
                        <FaClock className="text-slate-400" />
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

                    <td className="px-6 py-5">
                      {route.assigned ? (
                        <div>
                          <div className="flex items-center gap-2 font-bold text-slate-900">
                            <FaBus className="text-[#005CAB]" />

                            {route.busName}
                          </div>

                          <p className="text-sm text-slate-400 mt-1">
                            {route.busNumber}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">
                          No Bus Assigned
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      {route.operatorName ? (
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <FaUserTie className="text-[#005CAB]" />
                          {route.operatorName}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">
                          No Operator
                        </span>
                      )}
                    </td>

                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleDeleteClick(route)}
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
        title="Delete Route"
        description={`Are you sure you want to delete the route from ${selectedRoute?.origin} to ${selectedRoute?.destination}?`}
      />
    </AdminLayout>
  );
};

export default AdminRouteManagement;

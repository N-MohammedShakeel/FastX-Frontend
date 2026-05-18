import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaTicketAlt,
  FaBus,
  FaMapMarkerAlt,
  FaChair,
  FaClock,
  FaUsers,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import TableLayout from "../../components/common/TableLayout";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import StatCard from "../../components/common/StatCard";
import {
  fetchAdminBookings,
  removeBooking,
} from "../../store/admin/admin-actions";

const AdminBookingManagement = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = useSelector((state) => state.adminBooking.bookings);
  const loading = useSelector((state) => state.adminBooking.loading);
  const error = useSelector((state) => state.adminBooking.error);

  useEffect(() => {
    dispatch(fetchAdminBookings());
  }, [dispatch]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) =>
        booking.passengerName?.toLowerCase().includes(search.toLowerCase()) ||
        booking.busName?.toLowerCase().includes(search.toLowerCase()) ||
        booking.origin?.toLowerCase().includes(search.toLowerCase()) ||
        booking.destination?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [bookings, search]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(removeBooking(selectedBooking.bookingId));
    setIsDeleteOpen(false);
    setSelectedBooking(null);
  };

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const processingBookings = bookings.filter(
    (booking) => booking.status === "PROCESSING",
  ).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Booking Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor and manage passenger bookings across all operators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            footer="Platform Bookings"
            icon={<FaTicketAlt />}
            iconBg="bg-blue-50"
            iconColor="text-[#005CAB]"
          />

          <StatCard
            title="Confirmed"
            value={confirmedBookings}
            footer="Confirmed Tickets"
            icon={<FaUsers />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            title="Cancelled"
            value={cancelledBookings}
            footer="Cancelled Tickets"
            icon={<FaTrash />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
          />

          <StatCard
            title="Processing"
            value={processingBookings}
            footer="Pending Approval"
            icon={<FaSpinner />}
            iconBg="bg-yellow-50"
            iconColor="text-yellow-600"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by passenger, route or bus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#005CAB] outline-none transition"
            />
          </div>

          <p className="text-sm text-slate-500 font-medium">
            {filteredBookings.length} bookings found
          </p>
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading message="Loading bookings..." />
        ) : (
          <TableLayout
            title="All Bookings"
            subtitle="Track confirmed, pending and cancelled bookings"
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredBookings.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            empty={paginatedBookings.length === 0}
          >
            <>
              <thead className="bg-slate-50/50">
                <tr className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="text-left px-8 py-4">Booking</th>
                  <th className="text-left px-6 py-4">Passenger</th>
                  <th className="text-left px-6 py-4">Route</th>
                  <th className="text-left px-6 py-4">Seats</th>
                  <th className="text-left px-6 py-4">Fare</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-left px-8 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedBookings.map((booking) => (
                  <tr
                    key={booking.bookingId}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <FaTicketAlt className="text-[#005CAB]" />
                          BK-{booking.bookingId}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <FaClock className="text-slate-400" />

                          {new Date(booking.bookingTime).toLocaleDateString(
                            "en-IN",
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {booking.passengerName}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <FaBus className="text-slate-400" />

                          {booking.busName}
                        </div>

                        <p className="text-xs text-slate-400 mt-1">
                          {booking.busNumber}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-slate-800">
                          <FaMapMarkerAlt className="text-[#005CAB]" />
                          {booking.origin} → {booking.destination}
                        </div>

                        <p className="text-sm text-slate-500">
                          Departure:{" "}
                          {new Date(booking.departureTime).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <FaChair className="text-[#005CAB]" />
                          {booking.totalNoOfSeats} Seats
                        </div>

                        <p className="text-sm text-slate-500">
                          {booking.seatNumbers?.join(", ")}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-900">
                      ₹{booking.totalFare.toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        
                        ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "PROCESSING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <button
                        onClick={() => handleDeleteClick(booking)}
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
        title="Delete Booking"
        description={`Are you sure you want to delete booking #${selectedBooking?.bookingId}?`}
      />
    </AdminLayout>
  );
};

export default AdminBookingManagement;

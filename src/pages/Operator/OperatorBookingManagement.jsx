import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaTicketAlt,
  FaMoneyBillWave,
  FaBan,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import OperatorLayout from "../../components/operator/OperatorLayout";
import StatsCard from "../../components/common/StatCard";
import TableLayout from "../../components/common/TableLayout";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import {
  fetchOperatorBookings,
  approveRefundAction,
  rejectRefundAction,
  cancelBookingAction,
} from "../../store/operator/operator-actions";
import SuccessConfirmModal from "../../components/common/SuccessConfirmModal";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import BookingFormModal from "../../components/operator/BookingFormModal";

const OperatorBookingManagement = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = useSelector((state) => state.operatorBooking.bookings);
  const loading = useSelector((state) => state.operatorBooking.loading);
  const error = useSelector((state) => state.operatorBooking.error);

  useEffect(() => {
    dispatch(fetchOperatorBookings());
  }, [dispatch]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const passengerName = booking.passengerName?.toLowerCase() || "";
      const busNumber = booking.busNumber?.toLowerCase() || "";
      const matchesSearch =
        passengerName.includes(search.toLowerCase()) ||
        busNumber.includes(search.toLowerCase());
      const matchesFilter = filter === "ALL" ? true : booking.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  const totalRevenue = bookings
    .filter((booking) => booking.status === "CONFIRMED")
    .reduce((sum, booking) => sum + booking.totalFare, 0);

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const openApproveModal = (booking) => {
    setSelectedBooking(booking);
    setIsApproveOpen(true);
  };

  const openRejectModal = (booking) => {
    setSelectedBooking(booking);
    setIsRejectOpen(true);
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setIsCancelOpen(true);
  };

  const handleApproveRefund = () => {
    dispatch(
      approveRefundAction(selectedBooking.refundId, {
        bookingId: selectedBooking.bookingId,
        status: "APPROVED",
      }),
    );

    setIsApproveOpen(false);
    setSelectedBooking(null);
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleRejectRefund = () => {
    dispatch(
      rejectRefundAction(selectedBooking.refundId, {
        bookingId: selectedBooking.bookingId,
        status: "REJECTED",
      }),
    );

    setIsRejectOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = () => {
    dispatch(cancelBookingAction(selectedBooking.bookingId));

    setIsCancelOpen(false);
    setSelectedBooking(null);
  };

  return (
    <OperatorLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Booking Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor bookings, cancellations, passengers, and revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {["ALL", "CONFIRMED", "PROCESSING", "CANCELLED"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setFilter(item);
                setCurrentPage(1);
              }}
              className={`h-11 px-5 rounded-2xl text-sm font-bold transition
                
                ${
                  filter === item
                    ? "bg-[#005CAB] text-white shadow-lg shadow-blue-100"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatsCard
            title="Total Bookings"
            value={bookings.length}
            icon={<FaTicketAlt />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatsCard
            title="Net Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            icon={<FaMoneyBillWave />}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />

          <StatsCard
            title="Cancellations"
            value={cancelledCount}
            icon={<FaBan />}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
        </section>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

            <input
              type="text"
              placeholder="Search by passenger or bus number..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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
            title="Recent Bookings"
            subtitle="Track passenger reservations and status"
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
                  <th className="text-left px-8 py-4">Passenger</th>
                  <th className="text-left px-6 py-4">Route</th>
                  <th className="text-left px-6 py-4">Seats</th>
                  <th className="text-left px-6 py-4">Fare</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-8 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedBookings.map((booking) => (
                  <tr
                    key={booking.bookingId}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-8 py-5">
                      <div>
                        <p className="font-bold text-slate-900">
                          {booking.passengerName}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {booking.busNumber}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {booking.origin} → {booking.destination}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
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

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {booking.totalNoOfSeats}
                    </td>

                    <td className="px-6 py-5 font-bold text-slate-900">
                      ₹{booking.totalFare}
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
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleViewBooking(booking)}
                          className="px-4 h-10 rounded-xl bg-[#005CAB] text-white text-sm font-semibold hover:bg-[#004b96] transition"
                        >
                          View
                        </button>

                        {booking.status === "PROCESSING" ? (
                          <>
                            <button
                              onClick={() => openApproveModal(booking)}
                              className="w-10 h-10 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 flex items-center justify-center transition"
                            >
                              <FaCheck className="text-sm" />
                            </button>

                            <button
                              onClick={() => openRejectModal(booking)}
                              className="w-10 h-10 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-yellow-600 flex items-center justify-center transition"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </>
                        ) : booking.status === "CONFIRMED" ? (
                          <button
                            onClick={() => openCancelModal(booking)}
                            className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                          >
                            <FaTimes className="text-sm" />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableLayout>
        )}
      </div>
      <SuccessConfirmModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleApproveRefund}
        title="Approve Refund"
        description={`Are you sure you want to approve refund for ${selectedBooking?.passengerName}?`}
        confirmText="Approve"
      />

      <DeleteConfirmModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleRejectRefund}
        title="Reject Refund"
        description={`Are you sure you want to reject refund for ${selectedBooking?.passengerName}?`}
        confirmText="Reject"
      />

      <DeleteConfirmModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking"
        description={`Are you sure you want to cancel booking #${selectedBooking?.bookingId}?`}
        confirmText="Cancel Booking"
      />
      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        booking={selectedBooking}
        loading={false}
      />
    </OperatorLayout>
  );
};

export default OperatorBookingManagement;

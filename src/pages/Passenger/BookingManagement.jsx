import React, { useState, useEffect } from "react";
import BookingCard from "../../components/passenger/BookingManagementComponents/BookingCard";
import { SiD } from "react-icons/si";
import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";
import RefundRequestModal from "../../components/passenger/RefundRequestModal";
import TicketDetailsModal from "../../components/passenger/TicketDetailsModal ";
import WalletD1 from "../../components/passenger/WalletD1";
import PromoCard from "../../components/passenger/PromoCard";
import { PassengerSidebarContent } from "../../components/passenger/PassengerSidebarContent";
import PastBookingCard from "../../components/passenger/BookingManagementComponents/PastBookingCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  fetchActiveBookings,
  fetchPastBookings,
  refundBooking,
} from "../../store/passenger/passenger-actions";
import { bookingActions } from "../../store/passenger/bookingSlice";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

export default function BookingManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const activeBookings = useSelector((state) => state.booking.activeBookings);
  const pastBookings = useSelector((state) => state.booking.pastBookings);
  const selectedBooking = useSelector((state) => state.booking.selectedBooking);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profileError = useSelector((state) => state.profile.error);
  const bookingLoading = useSelector((state) => state.booking.loading);
  const bookingError = useSelector((state) => state.booking.error);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchActiveBookings());
    dispatch(fetchPastBookings());
  }, [dispatch]);

  const handleCancel = (booking) => {
    dispatch(bookingActions.setSelectedBooking(booking));
    setIsRefundOpen(true);
  };

  const handleConfirmRefund = async () => {
    await dispatch(refundBooking(selectedBooking));
    setIsRefundOpen(false);
  };

  const handleView = (booking) => {
    dispatch(bookingActions.setSelectedBooking(booking));
    setIsTicketOpen(true);
  };

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

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 lg:mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                My Journey Center
              </h1>

              <p className="text-sm sm:text-base text-slate-700 mt-1 sm:mt-2">
                Welcome back {profile?.name || "there"}! You have{" "}
                {activeBookings.length} upcoming trips.
              </p>
            </div>

            {profileError ? <Error message={profileError} /> : null}
            {profileLoading ? (
              <Loading />
            ) : (
              <WalletD1 balance={profile?.wallet} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10">
            <div className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Upcoming Trips
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 max-h-175 overflow-y-auto custom-scrollbar pr-2 ">
                {bookingError && <Error message={bookingError} />}
                {bookingLoading ? (
                  <Loading message="Loading trips..." />
                ) : activeBookings.length > 0 ? (
                  activeBookings.map((b) => (
                    <BookingCard
                      key={b.bookingId}
                      booking={b}
                      onCancel={handleCancel}
                      onView={handleView}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-xl p-10 text-center shadow">
                    <i className="fa-solid fa-ticket text-4xl text-slate-300"></i>

                    <p className="mt-4 text-lg font-semibold text-slate-700">
                      No upcoming trips
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4">
                  Past Bookings
                </h2>

                <div className="space-y-3 sm:space-y-4 max-h-175 overflow-y-auto custom-scrollbar pr-2">
                  {pastBookings.length > 0 ? (
                    pastBookings.map((booking) => (
                      <PastBookingCard
                        key={booking.bookingId}
                        booking={booking}
                      />
                    ))
                  ) : (
                    <div className="bg-[#F5F3F3] rounded-xl p-8 text-center">
                      <i className="fa-solid fa-clock-rotate-left text-3xl text-slate-300"></i>

                      <p className="mt-3 font-semibold text-slate-700">
                        No past bookings
                      </p>

                      <p className="text-sm text-slate-500">
                        Your completed trips will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <PromoCard />
            </div>
          </div>
        </main>
      </div>

      <RefundRequestModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        booking={selectedBooking}
        onConfirmRefund={handleConfirmRefund}
      />

      <TicketDetailsModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}

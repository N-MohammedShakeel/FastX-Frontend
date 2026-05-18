import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatsGrid from "../../components/operator/StatsGrid";
import EarningsChart from "../../components/operator/EarningsChart";
import RecentTripsTable from "../../components/operator/RecentTripsTable";
import WalletD1 from "../../components/common/WalletD1";
import OperatorLayout from "../../components/operator/OperatorLayout";
import {
  fetchOperatorProfile,
  fetchOperatorBookings,
  fetchOperatorStats,
} from "../../store/operator/operator-actions";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";
import BookingFormModal from "../../components/operator/BookingFormModal";

const OperatorDashboard = () => {
  const dispatch = useDispatch();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const profile = useSelector((state) => state.operatorProfile.profile);
  const stats = useSelector((state) => state.operatorStats.stats);
  const bookings = useSelector((state) => state.operatorBooking.bookings);

  const profileLoading = useSelector((state) => state.operatorProfile.loading);
  const statsLoading = useSelector((state) => state.operatorStats.loading);
  const bookingLoading = useSelector((state) => state.operatorBooking.loading);

  const profileError = useSelector((state) => state.operatorProfile.error);
  const statsError = useSelector((state) => state.operatorStats.error);
  const bookingError = useSelector((state) => state.operatorBooking.error);

  useEffect(() => {
    dispatch(fetchOperatorProfile());
    dispatch(fetchOperatorStats());
    dispatch(fetchOperatorBookings());
  }, [dispatch]);

  const loading = profileLoading || statsLoading || bookingLoading;
  const error = profileError || statsError || bookingError;

  if (loading) {
    return (
      <OperatorLayout>
        <Loading message="Loading dashboard..." />
      </OperatorLayout>
    );
  }

  if (error) {
    return (
      <OperatorLayout>
        <Error message={error} />
      </OperatorLayout>
    );
  }

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  return (
    <OperatorLayout>
      <main className="flex-1 p-6 lg:p-10 space-y-8 max-w-400 mx-auto w-full overflow-hidden">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Good Morning, {profile?.name || "Operator"}
            </h1>

            <p className="text-slate-500 mt-2">
              Here's your fleet performance overview for today.
            </p>
          </div>

          <WalletD1 balance={profile?.wallet || 0} />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatsGrid stats={stats} />
        </section>

        <section className="space-y-8">
          <EarningsChart bookings={bookings} />
          <RecentTripsTable bookings={bookings} onView={handleViewBooking} />
        </section>
      </main>

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        booking={selectedBooking}
        loading={false}
      />
    </OperatorLayout>
  );
};

export default OperatorDashboard;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSection from "../../components/passenger/CheckoutPageComponents/PaymentSection";
import BookingSummary from "../../components/passenger/CheckoutPageComponents/BookingSummary";
import BackButton from "../../components/common/BackButton";
import Navbar from "../../components/common/Navbar";
import BookingConfirmationModal from "../../components/passenger/BookingConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { bookTicket } from "../../store/passenger/passenger-actions";
import Error from "../../components/common/Error";
import Loading from "../../components/common/Loading";

const CheckoutPage = () => {
  const [isBookingConfirmationModalOpen, setIsBookingConfirmationModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const bookingInfo = location.state;

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const bookingResponse = useSelector((state) => state.booking.bookingResponse);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profileError = useSelector((state) => state.profile.error);
  const bookingLoading = useSelector((state) => state.booking.loading);
  const bookingError = useSelector((state) => state.booking.error);

  useEffect(() => {
    if (!bookingInfo) {
      navigate("/passenger-dashboard");
      return;
    }
  }, [navigate, bookingInfo]);

  const handleBooking = async () => {
    const payload = {
      busId: bookingInfo.busId,
      totalFare: bookingInfo.totalFare,
      totalNoOfSeats: bookingInfo.totalNoOfSeats,
      seatNumbers: bookingInfo.selectedSeats,
    };

    await dispatch(bookTicket(payload));
    setIsBookingConfirmationModalOpen(true);
  };

  return (
    <div className="bg-[#FBF9F9] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <BackButton />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-sans">
                Review & Pay
              </h1>

              <p className="text-gray-600 text-sm sm:text-base">
                Complete your booking using wallet balance.
              </p>
            </div>

            {profileError && <Error message={profileError} />}

            {profileLoading ? (
              <Loading message="Loading Profile ..." />
            ) : (
              <PaymentSection
                balance={Number(profile?.wallet) || 0}
                total={Number(bookingInfo?.totalFare) || 0}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-22 h-fit">
            {bookingError && <Error message={bookingError} />}

            {bookingLoading ? (
              <Loading message="Processing Booking ..." />
            ) : (
              <BookingSummary
                bookingInfo={bookingInfo}
                onConfirm={handleBooking}
                loading={bookingLoading}
              />
            )}
          </div>
        </div>
      </div>

      <BookingConfirmationModal
        isOpen={isBookingConfirmationModalOpen}
        onClose={() => {
          setIsBookingConfirmationModalOpen(false);
          navigate("/passenger/booking");
        }}
        booking={bookingResponse}
      />
    </div>
  );
};

export default CheckoutPage;

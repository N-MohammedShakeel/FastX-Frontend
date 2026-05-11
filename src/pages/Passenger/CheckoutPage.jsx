import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentSection from "../../components/passenger/CheckoutPageComponents/PaymentSection";
import BookingSummary from "../../components/passenger/CheckoutPageComponents/BookingSummary";
import BackButton from "../../components/common/BackButton";
import Navbar from "../../components/common/Navbar";
import BookingConfirmationModal from "../../components/passenger/BookingConfirmationModal";
import { createBooking, getProfile } from "../../services/passengerService";

const CheckoutPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const bookingInfo = location.state;

  useEffect(() => {
    if (!bookingInfo) {
      navigate("/passenger-dashboard");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  console.log(bookingInfo);

  const handleBooking = async () => {
    try {
      setLoading(true);

      const payload = {
        busId: bookingInfo.busId,
        totalFare: bookingInfo.totalFare,
        totalNoOfSeats: bookingInfo.totalNoOfSeats,
        seatNumbers: bookingInfo.selectedSeats,
      };

      const response = await createBooking(payload);
      const booked = response.data;
      setBookingData(booked);
      setIsOpen(true);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
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

            <PaymentSection
              balance={Number(profile?.wallet) || 0}
              total={Number(bookingInfo?.totalFare) || 0}
            />
          </div>

          <div className="lg:sticky lg:top-22 h-fit">
            <BookingSummary
              bookingInfo={bookingInfo}
              onConfirm={handleBooking}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <BookingConfirmationModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          navigate("/bookings");
        }}
        booking={bookingData}
      />
    </div>
  );
};

export default CheckoutPage;

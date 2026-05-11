import React from "react";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PassengerDashboard from "./pages/Passenger/PassengerDashboard";
import BookingManagement from "./pages/Passenger/BookingManagement";
import UserProfile from "./pages/Passenger/Profile";
import SearchTickets from "./pages/Passenger/SearchTicket";
import CheckoutPage from "./pages/Passenger/CheckoutPage";
import SeatSelectionPage from "./pages/Passenger/SeatSelectionPage";
import OAuthSuccess from "./pages/OAuthSuccess";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/search" element={<SearchTickets />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/seat-selection/:busId" element={<SeatSelectionPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </>
  );
};

export default App;

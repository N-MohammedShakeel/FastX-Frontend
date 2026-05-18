import React from "react";
import PassengerDashboard from "../pages/Passenger/PassengerDashboard";
import BookingManagement from "../pages/Passenger/BookingManagement";
import UserProfile from "../pages/Passenger/Profile";
import SearchTickets from "../pages/Passenger/SearchTickets";
import CheckoutPage from "../pages/Passenger/Checkout";
import SeatSelectionPage from "../pages/Passenger/SeatSelection";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";

const PassengerRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/passenger-dashboard"
          element={
            <ProtectedRoute>
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/booking"
          element={
            <ProtectedRoute>
              <BookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/search"
          element={
            <ProtectedRoute>
              <SearchTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/passenger/seat-selection/:busId"
          element={
            <ProtectedRoute>
              <SeatSelectionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default PassengerRoutes;

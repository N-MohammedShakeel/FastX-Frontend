import React from "react";
import PassengerDashboard from "../pages/Passenger/PassengerDashboard";
import BookingManagement from "../pages/Passenger/BookingManagement";
import UserProfile from "../pages/Passenger/Profile";
import SearchTickets from "../pages/Passenger/SearchTickets";
import CheckoutPage from "../pages/Passenger/CheckoutPage";
import SeatSelectionPage from "../pages/Passenger/SeatSelectionPage";
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
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seat-selection/:busId"
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

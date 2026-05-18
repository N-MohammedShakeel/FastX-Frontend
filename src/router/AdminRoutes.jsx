import React from "react";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminRouteManagement from "../pages/Admin/AdminRouteManagement";
import AdminBookingManagement from "../pages/Admin/AdminBookingManagement";
import AdminOperatorManagement from "../pages/Admin/AdminOperatorManagement";
import AdminPassengerManagement from "../pages/Admin/AdminPassengerManagement";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/routes"
          element={
            <ProtectedRoute>
              <AdminRouteManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminBookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/passengers"
          element={
            <ProtectedRoute>
              <AdminPassengerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/operators"
          element={
            <ProtectedRoute>
              <AdminOperatorManagement />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;

import { Route, Routes } from "react-router-dom";
import OperatorDashboard from "../pages/Operator/OperatorDashboard";
import OperatorProfile from "../pages/Operator/OperatorProfile";
import OperatorRouteManagement from "../pages/Operator/OperatorRouteManagement";
import OperatorBusManagement from "../pages/Operator/OperatorBusManagement";
import OperatorBookingManagement from "../pages/Operator/OperatorBookingManagement";
import OperatorRefundManagement from "../pages/Operator/OperatorRefundManagement";
import ProtectedRoute from "./ProtectedRoute";

const OperatorRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/operator-dashboard"
          element={
            <ProtectedRoute>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/route"
          element={
            <ProtectedRoute>
              <OperatorRouteManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/bus"
          element={
            <ProtectedRoute>
              <OperatorBusManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/booking"
          element={
            <ProtectedRoute>
              <OperatorBookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/refund"
          element={
            <ProtectedRoute>
              <OperatorRefundManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/operator/profile"
          element={
            <ProtectedRoute>
              <OperatorProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default OperatorRoutes;

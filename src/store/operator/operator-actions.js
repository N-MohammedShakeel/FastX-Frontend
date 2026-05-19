import { toast } from "react-toastify";

import {
  getOperatorProfile,
  updateOperatorProfile,
  updateOperatorPassword,
  getOperatorBuses,
  addBus,
  updateBus,
  deleteBus,
  getRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
  getOperatorBookings,
  getBookingById,
  getRefundRequests,
  processRefund,
  getOperatorStats,
  cancelBooking,
} from "../../services/operatorService";

import { operatorProfileActions } from "./operatorProfileSlice";
import { operatorBusActions } from "./operatorBusSlice";
import { operatorRouteActions } from "./operatorRouteSlice";
import { operatorBookingActions } from "./operatorBookingSlice";
import { operatorRefundActions } from "./operatorRefundSlice";
import { operatorStatsActions } from "./operatorStatsSlice";

const formatError = (error) => {
  const errorMessage = error.response?.data?.message;

  if (typeof errorMessage === "string") {
    return errorMessage;
  }

  if (typeof errorMessage === "object") {
    return Object.values(errorMessage).join(", ");
  }

  return error.message || "Something went wrong";
};

export const fetchOperatorProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorProfileActions.setLoading(true));
      const response = await getOperatorProfile();
      dispatch(operatorProfileActions.setProfile(response.data));
    } catch (error) {
      dispatch(operatorProfileActions.setError(formatError(error)));
      toast.error("Profile fetch failed");
      setTimeout(() => {
        dispatch(operatorProfileActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorProfileActions.setLoading(false));
    }
  };
};

export const fetchOperatorBuses = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorBusActions.setLoading(true));
      const response = await getOperatorBuses();
      dispatch(operatorBusActions.setBuses(response.data));
    } catch (error) {
      dispatch(operatorBusActions.setError(formatError(error)));
      toast.error("Bus fetch failed");
      setTimeout(() => {
        dispatch(operatorBusActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBusActions.setLoading(false));
    }
  };
};

export const createBus = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorBusActions.setLoading(true));
      const response = await addBus(payload);
      console.log(payload);
      dispatch(operatorBusActions.addBus(response.data));
      dispatch(fetchRoutesAction());
      toast.success("Bus added successfully");
    } catch (error) {
      dispatch(operatorBusActions.setError(formatError(error)));
      toast.error("Bus creation failed");
      setTimeout(() => {
        dispatch(operatorBusActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBusActions.setLoading(false));
    }
  };
};

export const fetchRoutesAction = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorRouteActions.setLoading(true));
      const response = await getRoutes();
      dispatch(operatorRouteActions.setRoutes(response.data));
    } catch (error) {
      dispatch(operatorRouteActions.setError(formatError(error)));
      toast.error("Routes fetch failed");
      setTimeout(() => {
        dispatch(operatorRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRouteActions.setLoading(false));
    }
  };
};

export const fetchOperatorBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorBookingActions.setLoading(true));
      const response = await getOperatorBookings();
      dispatch(operatorBookingActions.setBookings(response.data));
    } catch (error) {
      dispatch(operatorBookingActions.setError(formatError(error)));
      toast.error("Bookings fetch failed");
      setTimeout(() => {
        dispatch(operatorBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBookingActions.setLoading(false));
    }
  };
};

export const fetchRefundRequests = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorRefundActions.setLoading(true));
      const response = await getRefundRequests();
      dispatch(operatorRefundActions.setRefunds(response.data));
    } catch (error) {
      dispatch(operatorRefundActions.setError(formatError(error)));
      toast.error("Refund fetch failed");
      setTimeout(() => {
        dispatch(operatorRefundActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRefundActions.setLoading(false));
    }
  };
};

export const fetchOperatorStats = () => {
  return async (dispatch) => {
    try {
      dispatch(operatorStatsActions.setLoading(true));
      const response = await getOperatorStats();
      dispatch(operatorStatsActions.setStats(response.data));
    } catch (error) {
      dispatch(operatorStatsActions.setError(formatError(error)));
      toast.error("Stats fetch failed");
      setTimeout(() => {
        dispatch(operatorStatsActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorStatsActions.setLoading(false));
    }
  };
};

export const removeBus = (id) => {
  return async (dispatch) => {
    try {
      dispatch(operatorBusActions.setLoading(true));
      await deleteBus(id);
      dispatch(operatorBusActions.deleteBus(id));
      dispatch(fetchRoutesAction());
      toast.success("Bus deleted successfully");
    } catch (error) {
      dispatch(operatorBusActions.setError(formatError(error)));
      toast.error("Bus deletion failed");
      setTimeout(() => {
        dispatch(operatorBusActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBusActions.setLoading(false));
    }
  };
};

export const editOperatorProfile = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorProfileActions.setLoading(true));
      const response = await updateOperatorProfile(payload);
      dispatch(operatorProfileActions.setProfile(response.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(operatorProfileActions.setError(formatError(error)));
      toast.error("Profile update failed");
      setTimeout(() => {
        dispatch(operatorProfileActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorProfileActions.setLoading(false));
    }
  };
};

export const changeOperatorPassword = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorProfileActions.setLoading(true));
      await updateOperatorPassword(payload);
      toast.success("Password updated successfully");
    } catch (error) {
      dispatch(operatorProfileActions.setError(formatError(error)));
      toast.error("Password update failed");
      setTimeout(() => {
        dispatch(operatorProfileActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorProfileActions.setLoading(false));
    }
  };
};

export const editBus = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorBusActions.setLoading(true));
      const response = await updateBus(id, payload);
      dispatch(operatorBusActions.updateBus(response.data));
      dispatch(fetchRoutesAction());
      toast.success("Bus updated successfully");
    } catch (error) {
      dispatch(operatorBusActions.setError(formatError(error)));
      toast.error("Bus update failed");
      setTimeout(() => {
        dispatch(operatorBusActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBusActions.setLoading(false));
    }
  };
};

export const createRoute = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRouteActions.setLoading(true));
      const response = await addRoute(payload);
      dispatch(operatorRouteActions.addRoute(response.data));
      toast.success("Route added successfully");
    } catch (error) {
      dispatch(operatorRouteActions.setError(formatError(error)));
      toast.error("Route creation failed");
      setTimeout(() => {
        dispatch(operatorRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRouteActions.setLoading(false));
    }
  };
};

export const editRoute = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRouteActions.setLoading(true));
      const response = await updateRoute(id, payload);
      dispatch(operatorRouteActions.updateRoute(response.data));
      toast.success("Route updated successfully");
    } catch (error) {
      dispatch(operatorRouteActions.setError(formatError(error)));
      toast.error("Route update failed");
      setTimeout(() => {
        dispatch(operatorRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRouteActions.setLoading(false));
    }
  };
};

export const removeRoute = (id) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRouteActions.setLoading(true));
      await deleteRoute(id);
      dispatch(operatorRouteActions.deleteRoute(id));
      toast.success("Route deleted successfully");
    } catch (error) {
      dispatch(operatorRouteActions.setError(formatError(error)));
      toast.error("Route deletion failed");
      setTimeout(() => {
        dispatch(operatorRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRouteActions.setLoading(false));
    }
  };
};

export const fetchBookingById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(operatorBookingActions.setLoading(true));
      const response = await getBookingById(id);
      dispatch(operatorBookingActions.setSelectedBooking(response.data));
    } catch (error) {
      dispatch(operatorBookingActions.setError(formatError(error)));
      toast.error("Booking fetch failed");
      setTimeout(() => {
        dispatch(operatorBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBookingActions.setLoading(false));
    }
  };
};

export const updateRefundStatus = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRefundActions.setLoading(true));
      const response = await processRefund(id, payload);
      dispatch(operatorRefundActions.updateRefund(response.data));
      toast.success("Refund processed successfully");
    } catch (error) {
      dispatch(operatorRefundActions.setError(formatError(error)));
      toast.error("Refund process failed");
      setTimeout(() => {
        dispatch(operatorRefundActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRefundActions.setLoading(false));
    }
  };
};

export const approveRefundAction = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRefundActions.setLoading(true));
      const response = await processRefund(id, payload);
      dispatch(operatorRefundActions.updateRefund(response.data));
      dispatch(
        operatorBookingActions.updateBookingStatus({
          bookingId: payload.bookingId,
          status: "CANCELLED",
        }),
      );
      toast.success("Refund approved successfully");
    } catch (error) {
      dispatch(operatorRefundActions.setError(formatError(error)));
      toast.error("Refund approval failed");
      setTimeout(() => {
        dispatch(operatorRefundActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRefundActions.setLoading(false));
    }
  };
};

export const rejectRefundAction = (id, payload) => {
  return async (dispatch) => {
    try {
      dispatch(operatorRefundActions.setLoading(true));
      const response = await processRefund(id, payload);
      dispatch(operatorRefundActions.updateRefund(response.data));
      dispatch(
        operatorBookingActions.updateBookingStatus({
          bookingId: payload.bookingId,
          status: "CONFIRMED",
        }),
      );
      toast.success("Refund rejected successfully");
    } catch (error) {
      dispatch(operatorRefundActions.setError(formatError(error)));
      toast.error("Refund rejection failed");
      setTimeout(() => {
        dispatch(operatorRefundActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorRefundActions.setLoading(false));
    }
  };
};

export const cancelBookingAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(operatorBookingActions.setLoading(true));
      await cancelBooking(id);
      dispatch(
        operatorBookingActions.updateBookingStatus({
          bookingId: id,
          status: "CANCELLED",
        }),
      );
      toast.success("Booking cancelled successfully");
    } catch (error) {
      dispatch(operatorBookingActions.setError(formatError(error)));
      toast.error("Booking cancellation failed");
      setTimeout(() => {
        dispatch(operatorBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(operatorBookingActions.setLoading(false));
    }
  };
};

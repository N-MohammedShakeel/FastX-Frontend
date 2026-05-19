import { toast } from "react-toastify";

import {
  getAllPassengers,
  deletePassenger,
  getAllOperators,
  deleteOperator,
  getAllRoutes,
  deleteRoute,
  getAllBookings,
  getBookingById,
  deleteBooking,
} from "../../services/adminService";

import { adminPassengerActions } from "./adminPassengerSlice";
import { adminOperatorActions } from "./adminOperatorSlice";
import { adminRouteActions } from "./adminRouteSlice";
import { adminBookingActions } from "./adminBookingSlice";

const formatError = (error) => {
  return (
    error.response?.data?.message || error.message || "Something went wrong"
  );
};

export const fetchPassengers = () => {
  return async (dispatch) => {
    try {
      dispatch(adminPassengerActions.setLoading(true));
      const response = await getAllPassengers();
      dispatch(adminPassengerActions.setPassengers(response.data));
    } catch (error) {
      dispatch(adminPassengerActions.setError(formatError(error)));
      toast.error("Passenger fetch failed");
      setTimeout(() => {
        dispatch(adminPassengerActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminPassengerActions.setLoading(false));
    }
  };
};

export const removePassenger = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminPassengerActions.setLoading(true));
      await deletePassenger(id);
      dispatch(adminPassengerActions.deletePassenger(id));
      toast.success("Passenger deleted successfully");
    } catch (error) {
      dispatch(adminPassengerActions.setError(formatError(error)));
      toast.error(formatError(error));
      setTimeout(() => {
        dispatch(adminPassengerActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminPassengerActions.setLoading(false));
    }
  };
};

export const fetchOperators = () => {
  return async (dispatch) => {
    try {
      dispatch(adminOperatorActions.setLoading(true));
      const response = await getAllOperators();
      dispatch(adminOperatorActions.setOperators(response.data));
    } catch (error) {
      dispatch(adminOperatorActions.setError(formatError(error)));
      toast.error("Operator fetch failed");
      setTimeout(() => {
        dispatch(adminOperatorActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminOperatorActions.setLoading(false));
    }
  };
};

export const removeOperator = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminOperatorActions.setLoading(true));
      await deleteOperator(id);
      dispatch(adminOperatorActions.deleteOperator(id));
      toast.success("Operator deleted successfully");
    } catch (error) {
      dispatch(adminOperatorActions.setError(formatError(error)));
      toast.error(formatError(error));
      setTimeout(() => {
        dispatch(adminOperatorActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminOperatorActions.setLoading(false));
    }
  };
};

export const fetchAdminRoutes = () => {
  return async (dispatch) => {
    try {
      dispatch(adminRouteActions.setLoading(true));
      const response = await getAllRoutes();
      dispatch(adminRouteActions.setRoutes(response.data));
    } catch (error) {
      dispatch(adminRouteActions.setError(formatError(error)));
      toast.error("Routes fetch failed");
      setTimeout(() => {
        dispatch(adminRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminRouteActions.setLoading(false));
    }
  };
};

export const removeAdminRoute = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminRouteActions.setLoading(true));
      await deleteRoute(id);
      dispatch(adminRouteActions.deleteRoute(id));
      toast.success("Route deleted successfully");
    } catch (error) {
      dispatch(adminRouteActions.setError(formatError(error)));
      toast.error(formatError(error));
      setTimeout(() => {
        dispatch(adminRouteActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminRouteActions.setLoading(false));
    }
  };
};

export const fetchAdminBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(adminBookingActions.setLoading(true));
      const response = await getAllBookings();
      dispatch(adminBookingActions.setBookings(response.data));
    } catch (error) {
      dispatch(adminBookingActions.setError(formatError(error)));
      toast.error("Bookings fetch failed");
      setTimeout(() => {
        dispatch(adminBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminBookingActions.setLoading(false));
    }
  };
};

export const fetchAdminBookingById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminBookingActions.setLoading(true));
      const response = await getBookingById(id);
      dispatch(adminBookingActions.setSelectedBooking(response.data));
    } catch (error) {
      dispatch(adminBookingActions.setError(formatError(error)));
      toast.error("Booking fetch failed");
      setTimeout(() => {
        dispatch(adminBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminBookingActions.setLoading(false));
    }
  };
};

export const removeBooking = (id) => {
  return async (dispatch) => {
    try {
      dispatch(adminBookingActions.setLoading(true));
      await deleteBooking(id);
      dispatch(adminBookingActions.deleteBooking(id));
      toast.success("Booking deleted successfully");
    } catch (error) {
      dispatch(adminBookingActions.setError(formatError(error)));
      toast.error(formatError(error));
      setTimeout(() => {
        dispatch(adminBookingActions.setError(null));
      }, 3000);
    } finally {
      dispatch(adminBookingActions.setLoading(false));
    }
  };
};

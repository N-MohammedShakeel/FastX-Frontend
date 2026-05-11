import {
  getProfile,
  getPassengerBookings,
  getActiveBookings,
  getPastBookings,
  getAllRoutes,
  searchRoutes,
  getAvailableSeats,
} from "../../services/passengerService";
import { profileActions } from "./profile-slice";
import { bookingActions } from "./booking-slice";
import { routeActions } from "./route-slice";
import { seatActions } from "./seat-slice";

const fetchProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading(true));

      const response = await getProfile();

      dispatch(profileActions.setProfile(response.data));
    } catch (error) {
      dispatch(profileActions.setError(error.message));
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };
};

const fetchPassengerBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));

      const response = await getPassengerBookings();

      dispatch(bookingActions.setActiveBookings(response.data));
    } catch (error) {
      dispatch(bookingActions.setError(error.message));
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

const fetchActiveBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));

      const response = await getActiveBookings();

      dispatch(bookingActions.setActiveBookings(response.data));
    } catch (error) {
      dispatch(bookingActions.setError(error.message));
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

const fetchPastBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));

      const response = await getPastBookings();

      dispatch(bookingActions.setPastBookings(response.data));
    } catch (error) {
      dispatch(bookingActions.setError(error.message));
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

const fetchRoutes = (origin, destination, date) => {
  return async (dispatch) => {
    try {
      dispatch(routeActions.setLoading(true));

      let response;

      if (origin && destination && date) {
        response = await searchRoutes(origin, destination, date);
      } else {
        response = await getAllRoutes();
      }

      dispatch(routeActions.setRoutes(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(routeActions.setLoading(false));
    }
  };
};

const fetchSeats = (busId) => {
  return async (dispatch) => {
    try {
      dispatch(seatActions.setLoading(true));

      const response = await getAvailableSeats(busId);

      dispatch(seatActions.setSeats(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(seatActions.setLoading(false));
    }
  };
};

export const passengerActions = {
  fetchProfile,
  fetchPassengerBookings,
  fetchActiveBookings,
  fetchPastBookings,
  fetchRoutes,
  fetchSeats,
};

import {
  getProfile,
  getPassengerBookings,
  getActiveBookings,
  getPastBookings,
  getAllRoutes,
  searchRoutes,
  getAvailableSeats,
  requestRefund,
  createBooking,
  updatePassword,
  updateProfile,
  addMoneyToWallet,
} from "../../services/passengerService";
import { profileActions } from "./profileSlice";
import { bookingActions } from "./bookingSlice";
import { routeActions } from "./routeSlice";
import { seatActions } from "./seatSlice";
import { toast } from "react-toastify";
import { notificationActions } from "./notificationSlice";

export const fetchProfile = () => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading(true));
      const response = await getProfile();
      dispatch(profileActions.setProfile(response.data));
    } catch (error) {
      dispatch(
        profileActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Profile fetch failed",
        ),
      );
      setTimeout(() => {
        dispatch(profileActions.setError(null));
      }, 3000);
      toast.error("Profile fetch failed");
      dispatch(
        notificationActions.addNotification({
          title: "Error",
          message: "Failed to update profile",
          type: "error",
        }),
      );
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };
};

export const updatePassengerProfile = (profileData) => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading(true));
      const response = await updateProfile(profileData);
      dispatch(profileActions.setProfile(response.data));
      toast.success("Profile updated successfully");
      dispatch(
        notificationActions.addNotification({
          title: "Profile Updated",
          message: "Your profile details were updated successfully",
          type: "success",
        }),
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      let formattedError = "Profile update failed";

      if (typeof errorMessage === "string") {
        formattedError = errorMessage;
      } else if (typeof errorMessage === "object") {
        formattedError = Object.values(errorMessage).join(", ");
      }

      dispatch(profileActions.setError(formattedError));

      dispatch(
        notificationActions.addNotification({
          title: "Profile Update Failed",
          message: formattedError,
          type: "error",
        }),
      );

      setTimeout(() => {
        dispatch(profileActions.setError(null));
      }, 3000);

      toast.error(formattedError);
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };
};

export const changePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading(true));
      await updatePassword(passwordData);
      toast.success("Password updated successfully");
      dispatch(
        notificationActions.addNotification({
          title: "Password Updated",
          message: "Your password was updated successfully",
          type: "success",
        }),
      );

      await dispatch(fetchProfile());
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      let formattedError = "Password update failed";

      if (typeof errorMessage === "string") {
        formattedError = errorMessage;
      } else if (typeof errorMessage === "object") {
        formattedError = Object.values(errorMessage).join(", ");
      }

      dispatch(profileActions.setError(formattedError));

      dispatch(
        notificationActions.addNotification({
          title: "Password Updated Failed",
          message: "Your password was not updated successfully",
          type: "error",
        }),
      );

      setTimeout(() => {
        dispatch(profileActions.setError(null));
      }, 3000);

      toast.error("Password update failed");
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };
};

export const addMoney = (amount) => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setLoading(true));
      const response = await addMoneyToWallet(amount);
      dispatch(profileActions.updateWallet(response.data));
      toast.success("Money added successfully");
      dispatch(
        notificationActions.addNotification({
          title: "Money Added Successfully",
          message: "Your wallet balance was updated successfully",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        profileActions.setError(
          error.response?.data?.message || error.message || "Add money failed",
        ),
      );

      dispatch(
        notificationActions.addNotification({
          title: "Add Money Failed",
          message: "Failed to add money to wallet",
          type: "error",
        }),
      );

      setTimeout(() => {
        dispatch(profileActions.setError(null));
      }, 3000);

      toast.error("Add money failed");
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };
};

export const fetchPassengerBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));
      const response = await getPassengerBookings();
      dispatch(bookingActions.setAllBookings(response.data));
    } catch (error) {
      dispatch(
        bookingActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Bookings fetch failed",
        ),
      );

      setTimeout(() => {
        dispatch(bookingActions.setError(null));
      }, 3000);

      toast.error("Bookings fetch failed");
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

export const fetchActiveBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));
      const response = await getActiveBookings();
      dispatch(bookingActions.setActiveBookings(response.data));
    } catch (error) {
      dispatch(
        bookingActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Active Bookings fetch failed",
        ),
      );

      setTimeout(() => {
        dispatch(bookingActions.setError(null));
      }, 3000);
      toast.error("Active Bookings fetch failed");
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

export const fetchPastBookings = () => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));
      const response = await getPastBookings();
      dispatch(bookingActions.setPastBookings(response.data));
    } catch (error) {
      dispatch(
        bookingActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Past Bookings fetch failed",
        ),
      );

      setTimeout(() => {
        dispatch(bookingActions.setError(null));
      }, 3000);
      toast.error("Past Bookings fetch failed");
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

export const fetchRoutes = (origin, destination, date) => {
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
      dispatch(
        routeActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Routes fetch failed",
        ),
      );
      setTimeout(() => {
        dispatch(routeActions.setError(null));
      }, 3000);
      toast.error("Routes fetch failed");
    } finally {
      dispatch(routeActions.setLoading(false));
    }
  };
};

export const fetchSeats = (busId, busData) => {
  return async (dispatch) => {
    try {
      dispatch(seatActions.setLoading(true));
      const response = await getAvailableSeats(busId);
      const availableSeats = response.data || [];

      const generatedSeats = [];
      const totalSeats = busData?.noOfSeats || 40;

      for (let i = 1; i <= totalSeats; i++) {
        generatedSeats.push({
          id: i,
          type: busData?.sleeper ? "sleeper" : "seater",
          status: availableSeats.includes(i) ? "available" : "booked",
        });

        if (i % 4 === 2) {
          generatedSeats.push(null);
        }
      }

      dispatch(seatActions.setBusData(busData));
      dispatch(seatActions.setSeats(generatedSeats));
    } catch (error) {
      dispatch(
        seatActions.setError(
          error.response?.data?.message ||
            error.message ||
            "Seats fetch failed",
        ),
      );

      setTimeout(() => {
        dispatch(seatActions.setError(null));
      }, 3000);

      toast.error("Seats fetch failed");
    } finally {
      dispatch(seatActions.setLoading(false));
    }
  };
};
export const bookTicket = (bookingData) => {
  return async (dispatch) => {
    try {
      dispatch(bookingActions.setLoading(true));
      const response = await createBooking(bookingData);
      dispatch(bookingActions.addBooking(response.data));
      dispatch(bookingActions.setBookingResponse(response.data));
      toast.success("Ticket booked successfully");

      dispatch(
        notificationActions.addNotification({
          title: "Ticket Booked Successfully",
          message: "Your ticket has been booked successfully",
          type: "success",
        }),
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      let formattedError = "Ticket booking failed";

      if (typeof errorMessage === "string") {
        formattedError = errorMessage;
      } else if (typeof errorMessage === "object") {
        formattedError = Object.values(errorMessage).join(", ");
      }

      dispatch(bookingActions.setError(formattedError));

      dispatch(
        notificationActions.addNotification({
          title: "Ticket Booking Failed",
          message: "Failed to book ticket",
          type: "error",
        }),
      );

      setTimeout(() => {
        dispatch(bookingActions.setError(null));
      }, 3000);

      toast.error("Ticket booking failed");
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

export const refundBooking = (booking) => {
  return async (dispatch) => {
    try {
      if (booking.status === "PROCESSING") {
        toast.error("Refund already requested");
        return;
      }

      dispatch(bookingActions.setLoading(true));
      await requestRefund(booking.bookingId);
      dispatch(bookingActions.cancelBooking(booking.bookingId));
      dispatch(fetchActiveBookings());
      toast.success("Refund requested successfully");

      dispatch(
        notificationActions.addNotification({
          title: "Refund Requested",
          message: "Your refund request has been submitted successfully",
          type: "success",
        }),
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Refund request failed";

      dispatch(bookingActions.setError(errorMessage));

      dispatch(
        notificationActions.addNotification({
          title: "Refund Request Failed",
          message: "Failed to submit refund request",
          type: "error",
        }),
      );

      setTimeout(() => {
        dispatch(bookingActions.setError(null));
      }, 3000);
      toast.error(errorMessage);
    } finally {
      dispatch(bookingActions.setLoading(false));
    }
  };
};

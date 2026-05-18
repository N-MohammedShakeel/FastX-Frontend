import { createSlice } from "@reduxjs/toolkit";

const operatorBookingSlice = createSlice({
  name: "operatorBooking",

  initialState: {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setBookings(state, action) {
      state.bookings = action.payload;
    },

    setSelectedBooking(state, action) {
      state.selectedBooking = action.payload;
    },

    cancelBooking(state, action) {
      state.bookings = state.bookings.map((booking) =>
        booking.bookingId === action.payload
          ? {
              ...booking,
              status: "CANCELLED",
            }
          : booking,
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },

    updateBookingStatus(state, action) {
      state.bookings = state.bookings.map((booking) =>
        booking.bookingId === action.payload.bookingId
          ? {
              ...booking,
              status: action.payload.status,
            }
          : booking,
      );
    },
  },
});

export const operatorBookingActions = operatorBookingSlice.actions;

export default operatorBookingSlice;

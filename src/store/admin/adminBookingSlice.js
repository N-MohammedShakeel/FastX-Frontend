import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const adminBookingSlice = createSlice({
  name: "adminBooking",
  initialState,

  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },

    setSelectedBooking(state, action) {
      state.selectedBooking = action.payload;
    },

    deleteBooking(state, action) {
      state.bookings = state.bookings.filter(
        (item) => item.bookingId !== action.payload,
      );
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const adminBookingActions = adminBookingSlice.actions;

export default adminBookingSlice;

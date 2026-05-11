import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",

  initialState: {
    activeBookings: [],
    pastBookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setActiveBookings(state, action) {
      state.activeBookings = action.payload;
    },

    setPastBookings(state, action) {
      state.pastBookings = action.payload;
    },

    setSelectedBooking(state, action) {
      state.selectedBooking = action.payload;
    },

    addBooking(state, action) {
      state.activeBookings.unshift(action.payload);
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice;

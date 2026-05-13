import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",

  initialState: {
    allBookings: [],
    activeBookings: [],
    pastBookings: [],
    selectedBooking: null,
    bookingResponse: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setAllBookings(state, action) {
      state.allBookings = action.payload;
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
      state.allBookings.unshift(action.payload);
    },

    cancelBooking(state, action) {
      const bookingId = action.payload;

      const booking = state.activeBookings.find(
        (b) => b.bookingId === bookingId,
      );

      if (booking) {
        booking.status = "CANCELLED";

        state.pastBookings.unshift(booking);

        state.activeBookings = state.activeBookings.filter(
          (b) => b.bookingId !== bookingId,
        );
      }

      state.allBookings = state.allBookings.map((b) =>
        b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b,
      );
    },

    setBookingResponse(state, action) {
      state.bookingResponse = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const bookingActions = bookingSlice.actions;

export default bookingSlice;

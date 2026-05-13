import { createSlice } from "@reduxjs/toolkit";

const seatSlice = createSlice({
  name: "seat",

  initialState: {
    seats: [],
    selectedSeats: [],
    busData: null,
    loading: false,
    error: null,
  },

  reducers: {
    setSeats(state, action) {
      state.seats = action.payload;
    },

    setBusData(state, action) {
      state.busData = action.payload;
    },

    toggleSeat(state, action) {
      const seatId = action.payload;

      const exists = state.selectedSeats.includes(seatId);

      if (exists) {
        state.selectedSeats = state.selectedSeats.filter(
          (seat) => seat !== seatId,
        );
      } else {
        state.selectedSeats.push(seatId);
      }
    },

    clearSeats(state) {
      state.selectedSeats = [];
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const seatActions = seatSlice.actions;

export default seatSlice;

import { createSlice } from "@reduxjs/toolkit";

const seatSlice = createSlice({
  name: "seat",

  initialState: {
    seats: [],
    selectedSeats: [],
    loading: false,
  },

  reducers: {
    setSeats(state, action) {
      state.seats = action.payload;
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
  },
});

export const seatActions = seatSlice.actions;

export default seatSlice;

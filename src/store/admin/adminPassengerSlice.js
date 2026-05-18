import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passengers: [],
  loading: false,
  error: null,
};

const adminPassengerSlice = createSlice({
  name: "adminPassenger",
  initialState,

  reducers: {
    setPassengers(state, action) {
      state.passengers = action.payload;
    },

    deletePassenger(state, action) {
      state.passengers = state.passengers.filter(
        (item) => item.id !== action.payload,
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

export const adminPassengerActions = adminPassengerSlice.actions;

export default adminPassengerSlice;

import { createSlice } from "@reduxjs/toolkit";

const operatorBusSlice = createSlice({
  name: "operatorBus",

  initialState: {
    buses: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setBuses(state, action) {
      state.buses = action.payload;
    },

    addBus(state, action) {
      state.buses.unshift(action.payload);
    },

    updateBus(state, action) {
      state.buses = state.buses.map((bus) =>
        bus.busId === action.payload.busId ? action.payload : bus,
      );
    },

    deleteBus(state, action) {
      state.buses = state.buses.filter((bus) => bus.busId !== action.payload);
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const operatorBusActions = operatorBusSlice.actions;

export default operatorBusSlice;

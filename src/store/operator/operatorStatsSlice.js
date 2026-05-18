import { createSlice } from "@reduxjs/toolkit";

const operatorStatsSlice = createSlice({
  name: "operatorStats",

  initialState: {
    stats: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setStats(state, action) {
      state.stats = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const operatorStatsActions = operatorStatsSlice.actions;

export default operatorStatsSlice;

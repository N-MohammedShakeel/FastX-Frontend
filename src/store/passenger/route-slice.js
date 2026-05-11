import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",

  initialState: {
    buses: [],
    filteredBuses: [],
    loading: false,
    filters: {
      types: [],
      maxFare: 2000,
      amenities: [],
    },
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRoutes(state, action) {
      state.buses = action.payload;
      state.filteredBuses = action.payload;
    },

    setFilteredRoutes(state, action) {
      state.filteredBuses = action.payload;
    },

    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const routeActions = routeSlice.actions;

export default routeSlice;

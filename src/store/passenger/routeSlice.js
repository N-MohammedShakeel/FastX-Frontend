import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
  types: [],
  maxFare: 2000,
  amenities: [],
};

const applyFilters = (buses, filters) => {
  let updated = [...buses];

  if (filters.types.length > 0) {
    updated = updated.filter((bus) => {
      return filters.types.some((type) => {
        switch (type) {
          case "AC Sleeper":
            return bus.ac && bus.sleeper;

          case "Non-AC Sleeper":
            return !bus.ac && bus.sleeper;

          case "AC Seater":
            return bus.ac && !bus.sleeper;

          case "Non-AC Seater":
            return !bus.ac && !bus.sleeper;

          default:
            return false;
        }
      });
    });
  }

  updated = updated.filter((bus) => (bus.fare || 0) <= filters.maxFare);

  if (filters.amenities.length > 0) {
    updated = updated.filter((bus) => {
      const amenities = [];

      if (bus.chargingPoint) amenities.push("Charging");
      if (bus.waterBottle) amenities.push("Water");
      if (bus.blanket) amenities.push("Blanket");
      if (bus.tv) amenities.push("TV");

      return filters.amenities.every((item) => amenities.includes(item));
    });
  }

  return updated;
};

const routeSlice = createSlice({
  name: "route",

  initialState: {
    buses: [],
    filteredBuses: [],
    loading: false,
    error: null,
    filters: initialFilters,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRoutes(state, action) {
      state.buses = action.payload;
      state.filteredBuses = applyFilters(action.payload, state.filters);
    },

    setFilters(state, action) {
      state.filters = action.payload;
      state.filteredBuses = applyFilters(state.buses, action.payload);
    },

    resetFilters(state) {
      state.filters = initialFilters;
      state.filteredBuses = state.buses;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const routeActions = routeSlice.actions;

export default routeSlice;

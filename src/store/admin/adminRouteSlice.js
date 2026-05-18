import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
  loading: false,
  error: null,
};

const adminRouteSlice = createSlice({
  name: "adminRoute",
  initialState,

  reducers: {
    setRoutes(state, action) {
      state.routes = action.payload;
    },

    deleteRoute(state, action) {
      state.routes = state.routes.filter(
        (item) => item.routeId !== action.payload,
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

export const adminRouteActions = adminRouteSlice.actions;

export default adminRouteSlice;

import { createSlice } from "@reduxjs/toolkit";

const operatorRouteSlice = createSlice({
  name: "operatorRoute",

  initialState: {
    routes: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRoutes(state, action) {
      state.routes = action.payload;
    },

    addRoute(state, action) {
      state.routes.unshift(action.payload);
    },

    updateRoute(state, action) {
      state.routes = state.routes.map((route) =>
        route.routeId === action.payload.routeId ? action.payload : route,
      );
    },

    deleteRoute(state, action) {
      state.routes = state.routes.filter(
        (route) => route.routeId !== action.payload,
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const operatorRouteActions = operatorRouteSlice.actions;

export default operatorRouteSlice;

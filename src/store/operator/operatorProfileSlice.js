import { createSlice } from "@reduxjs/toolkit";

const operatorProfileSlice = createSlice({
  name: "operatorProfile",

  initialState: {
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setProfile(state, action) {
      state.profile = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    updateWallet(state, action) {
      if (state.profile) {
        state.profile.wallet = action.payload;
      }
    },
  },
});

export const operatorProfileActions = operatorProfileSlice.actions;

export default operatorProfileSlice;

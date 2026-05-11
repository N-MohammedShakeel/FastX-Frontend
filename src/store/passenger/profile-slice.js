import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

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

export const profileActions = profileSlice.actions;

export default profileSlice;

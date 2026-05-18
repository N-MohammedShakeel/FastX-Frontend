import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  operators: [],
  loading: false,
  error: null,
};

const adminOperatorSlice = createSlice({
  name: "adminOperator",
  initialState,

  reducers: {
    setOperators(state, action) {
      state.operators = action.payload;
    },

    deleteOperator(state, action) {
      state.operators = state.operators.filter(
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

export const adminOperatorActions = adminOperatorSlice.actions;

export default adminOperatorSlice;

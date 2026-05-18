import { createSlice } from "@reduxjs/toolkit";

const operatorRefundSlice = createSlice({
  name: "operatorRefund",

  initialState: {
    refunds: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setRefunds(state, action) {
      state.refunds = action.payload;
    },

    updateRefund(state, action) {
      state.refunds = state.refunds.map((refund) =>
        refund.refundId === action.payload.refundId ? action.payload : refund,
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const operatorRefundActions = operatorRefundSlice.actions;

export default operatorRefundSlice;

import { configureStore } from "@reduxjs/toolkit";

import profileSlice from "./profileSlice";
import bookingSlice from "./bookingSlice";
import routeSlice from "./routeSlice";
import seatSlice from "./seatSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    booking: bookingSlice.reducer,
    route: routeSlice.reducer,
    seat: seatSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;

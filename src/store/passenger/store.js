import { configureStore } from "@reduxjs/toolkit";

import profileSlice from "./profile-slice";
import bookingSlice from "./booking-slice";
import routeSlice from "./route-slice";
import seatSlice from "./seat-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    booking: bookingSlice.reducer,
    route: routeSlice.reducer,
    seat: seatSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

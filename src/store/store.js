import { configureStore } from "@reduxjs/toolkit";

import profileSlice from "./passenger/profileSlice";
import bookingSlice from "./passenger/bookingSlice";
import routeSlice from "./passenger/routeSlice";
import seatSlice from "./passenger/seatSlice";
import notificationSlice from "./passenger/notificationSlice";
import operatorProfileSlice from "./operator/operatorProfileSlice";
import operatorBusSlice from "./operator/operatorBusSlice";
import operatorRouteSlice from "./operator/operatorRouteSlice";
import operatorBookingSlice from "./operator/operatorBookingSlice";
import operatorRefundSlice from "./operator/operatorRefundSlice";
import operatorStatsSlice from "./operator/operatorStatsSlice";
import adminPassengerSlice from "./admin/adminPassengerSlice";
import adminOperatorSlice from "./admin/adminOperatorSlice";
import adminRouteSlice from "./admin/adminRouteSlice";
import adminBookingSlice from "./admin/adminBookingSlice";

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    booking: bookingSlice.reducer,
    route: routeSlice.reducer,
    seat: seatSlice.reducer,
    notification: notificationSlice.reducer,
    operatorProfile: operatorProfileSlice.reducer,
    operatorBus: operatorBusSlice.reducer,
    operatorRoute: operatorRouteSlice.reducer,
    operatorBooking: operatorBookingSlice.reducer,
    operatorRefund: operatorRefundSlice.reducer,
    operatorStats: operatorStatsSlice.reducer,
    adminPassenger: adminPassengerSlice.reducer,
    adminOperator: adminOperatorSlice.reducer,
    adminRoute: adminRouteSlice.reducer,
    adminBooking: adminBookingSlice.reducer,
  },
});

export default store;

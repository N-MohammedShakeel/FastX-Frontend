import api from "./api";

export const getPassengerBookings = async () => {
  const response = await api.get("/passenger/bookings");
  return response.data;
};

export const searchRoutes = async (origin, destination, date) => {
  const response = await api.get("/passenger/routes/search", {
    params: {
      origin,
      destination,
      date,
    },
  });
  return response.data;
};

export const getAllRoutes = async () => {
  const response = await api.get("/passenger/routes");
  return response.data;
};

export const getAvailableSeats = async (busId) => {
  const response = await api.get(`/passenger/bus/${busId}/seats`);
  return response.data;
};

export const createBooking = async (payload) => {
  const response = await api.post("/passenger/bookings", payload);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/passenger/profile");
  return response.data;
};

export const getActiveBookings = async () => {
  const response = await api.get("/passenger/bookings/active");
  return response.data;
};

export const getPastBookings = async () => {
  const response = await api.get("/passenger/bookings/past");
  return response.data;
};

export const requestRefund = async (bookingId) => {
  const response = await api.post(`/passenger/refunds/${bookingId}`);
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await api.put("/passenger/profile", payload);
  return response.data;
};

export const updatePassword = async (payload) => {
  const response = await api.put("/passenger/password", payload);
  return response.data;
};

export const addMoneyToWallet = async (amount) => {
  const response = await api.post("/passenger/wallet/add", null, {
    params: { amount },
  });
  return response.data;
};

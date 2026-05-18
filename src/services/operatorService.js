import api from "./api";

export const getOperatorProfile = async () => {
  const response = await api.get("/operator/profile");
  return response.data;
};

export const updateOperatorProfile = async (payload) => {
  const response = await api.put("/operator/profile", payload);
  return response.data;
};

export const updateOperatorPassword = async (payload) => {
  const response = await api.put("/operator/password", payload);
  return response.data;
};

export const getOperatorBuses = async () => {
  const response = await api.get("/operator/bus");
  return response.data;
};

export const addBus = async (payload) => {
  const response = await api.post("/operator/bus", payload);
  return response.data;
};

export const updateBus = async (id, payload) => {
  const response = await api.put(`/operator/bus/${id}`, payload);
  return response.data;
};

export const deleteBus = async (id) => {
  const response = await api.delete(`/operator/bus/${id}`);
  return response.data;
};

export const getRoutes = async () => {
  const response = await api.get("/operator/routes");
  return response.data;
};

export const addRoute = async (payload) => {
  const response = await api.post("/operator/routes", payload);
  return response.data;
};

export const updateRoute = async (id, payload) => {
  const response = await api.put(`/operator/routes/${id}`, payload);
  return response.data;
};

export const deleteRoute = async (id) => {
  const response = await api.delete(`/operator/routes/${id}`);
  return response.data;
};

export const getOperatorBookings = async () => {
  const response = await api.get("/operator/bookings");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/operator/bookings/${id}`);
  return response.data;
};

export const getRefundRequests = async () => {
  const response = await api.get("/operator/refunds");
  return response.data;
};

export const processRefund = async (id, payload) => {
  const response = await api.put(`/operator/refunds/${id}`, payload);
  return response.data;
};

export const getOperatorStats = async () => {
  const response = await api.get("/operator/stats");
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.put(`/operator/bookings/${id}/cancel`);
  return response.data;
};

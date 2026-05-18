import api from "./api";

export const getAllPassengers = async () => {
  const response = await api.get("/admin/passengers");
  return response.data;
};

export const deletePassenger = async (id) => {
  const response = await api.delete(`/admin/passengers/${id}`);
  return response.data;
};

export const getAllOperators = async () => {
  const response = await api.get("/admin/operators");
  return response.data;
};

export const deleteOperator = async (id) => {
  const response = await api.delete(`/admin/operators/${id}`);
  return response.data;
};

export const getAllRoutes = async () => {
  const response = await api.get("/admin/routes");
  return response.data;
};

export const deleteRoute = async (id) => {
  const response = await api.delete(`/admin/routes/${id}`);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get("/admin/bookings");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/admin/bookings/${id}`);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/admin/bookings/${id}`);
  return response.data;
};

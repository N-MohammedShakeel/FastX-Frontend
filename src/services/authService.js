import api from "./api";

export const registerPassenger = async (data) => {
  const response = await api.post("/auth/register/passenger", data);
  return response.data;
};

export const registerOperator = async (data) => {
  const response = await api.post("/auth/register/operator", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

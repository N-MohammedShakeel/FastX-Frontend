import api from "./api";
import publicApi from "./publicApi";

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

export const forgotPassword = async (email) => {
  const response = await publicApi.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

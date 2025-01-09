import api from "../api";

export const getUsers = async () => {
  const response = await api.get("/api/user/");
  return response;
}

export const getUser = async (id) => {
  const response = await api.get(`/api/user/${id}/`);
  return response;
}
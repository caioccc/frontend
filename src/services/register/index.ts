import api from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (payload: any) => {
  const response = await api.post("/api/auth/register/", { ...payload });
  return response;
};

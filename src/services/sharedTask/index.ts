/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSharedTasks = async (page) => {
  const response = await api.get("/api/sharedtask/?page=" + page);
  return response;
};

export const searchSharedTasks = async (name: any) => {
  const response = await api.get("/api/sharedtask/?name=" + name);
  return response;
}

export const createSharedTask = async (payload: any) => {
  const response = await api.post("/api/sharedtask/", { ...payload });
  return response;
};

export const updateSharedTask = async (payload: any) => {
  const idSharedTask = payload.id;
  const response = await api.put(`/api/sharedtask/${idSharedTask}/`, { ...payload });
  return response;
};

export const deleteSharedTask = async (payload: any) => {
  const idSharedTask = payload.id;
  const response = await api.delete(`/api/sharedtask/${idSharedTask}/`);
  return response;
};

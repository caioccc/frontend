/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTasks = async (page) => {
  const response = await api.get("/api/task/?page=" + page);
  return response;
};

export const searchTasks = async (name: any) => {
  const response = await api.get("/api/task/?name=" + name);
  return response;
}

export const createTask = async (payload: any) => {
  const response = await api.post("/api/task/", { ...payload });
  return response;
};

export const updateTask = async (payload: any) => {
  const idTask = payload.id;
  const response = await api.put(`/api/task/${idTask}/`, { ...payload });
  return response;
};

export const deleteTask = async (payload: any) => {
  const idTask = payload.id;
  const response = await api.delete(`/api/task/${idTask}/`);
  return response;
};

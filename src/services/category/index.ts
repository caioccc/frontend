/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategories = async (page) => {
  const response = await api.get("/api/category/?page=" + page);
  return response;
};

export const getAllCategories = async () => {
  const response = await api.get("/api/allcategories/");
  return response;
}

export const getCategory = async (id: any) => {
  const response = await api.get(`/api/category/${id}/`);
  return response;
}

export const searchCategories = async (name: any) => {
  const response = await api.get("/api/category/?name=" + name);
  return response;
}

export const createCategory = async (payload: any) => {
  const response = await api.post("/api/category/", { ...payload });
  return response;
};

export const updateCategory = async (payload: any) => {
  const idCategory = payload.id;
  const response = await api.put(`/api/category/${idCategory}/`, { ...payload });
  return response;
};

export const deleteCategory = async (payload: any) => {
  const idCategory = payload.id;
  const response = await api.delete(`/api/category/${idCategory}/`);
  return response;
};

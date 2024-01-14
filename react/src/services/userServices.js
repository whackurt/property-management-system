import { api } from "./axios";

// const headers = {
// 	Authorization: localStorage.getItem('adminToken'),
// };

export const GetUsers = async () => {
  try {
    const res = await api.get("/user");
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

export const CreateUser = async (userData) => {
  try {
    const res = await api.post(`/user/create`, userData);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

export const UpdateUser = async (id, updatedData) => {
  try {
    const res = await api.put(`/user/update/${id}`, updatedData);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

export const DeleteUser = async (id) => {
  try {
    const res = await api.delete(`/user/delete/${id}`);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

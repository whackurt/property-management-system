import { api } from "./axios";

// const headers = {
// 	Authorization: localStorage.getItem('adminToken'),
// };

export const LoginAdmin = async (creds) => {
  try {
    const res = await api.post("/auth/login", creds);
    return res;
  } catch (error) {
    return { error: error.message };
  }
};

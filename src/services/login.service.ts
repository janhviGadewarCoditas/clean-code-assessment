import { axiosInstance } from "./axiosInstance";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

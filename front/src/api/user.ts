import axios from "axios";
import $api from "./index"

export type RegisterAuthProps = {
  username: string;
  password: string;
};

export type RegisterSuccess = {
  username: string;
  id: number;
};

export type RegisterBad = {
  username: string[];
  password: string[];
};

export const register = async (registerData: RegisterAuthProps) => {
  const response = await $api.post<RegisterSuccess>("/api/v1/auth/users/", registerData)
  // axios.post<RegisterSuccess>(BASE_URL + "/api/v1/auth/users/", registerData)
  return response.data
};

export type AuthSuccess = {
  auth_token: string;
};

export type AuthBad = {
  non_field_errors: string[];
};

export const auth = async (authData: RegisterAuthProps) => {
  const response = await $api.post<AuthSuccess>("/auth/token/login/", authData)
  // axios.post<AuthSuccess>(BASE_URL + "/auth/token/login/", authData)
  return {...response.data, ...authData}
};

export const logOut = async () => {
  const response = await $api.post("/auth/token/logout/")
  return response
}
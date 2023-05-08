import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  auth,
  AuthBad,
  
  logOut,
  
  register,
  RegisterAuthProps,
  RegisterBad,
} from "../api/user";

export const userRegister = createAsyncThunk(
  "users/register",
  async (registerData: RegisterAuthProps, { rejectWithValue }) => {
    try {
      const data = await register(registerData);
      return data;
    } catch (err) {
      let error = err as AxiosError<RegisterBad>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userAuth = createAsyncThunk(
  "users/auth",
  async (registerData: RegisterAuthProps, { rejectWithValue }) => {
    try {
      const data = await auth(registerData);
      return data;
    } catch (err) {
      let error = err as AxiosError<AuthBad>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  "users/logout",
  async () => {
    const data = await logOut();
    return data
  }
)

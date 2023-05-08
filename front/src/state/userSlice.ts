import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthBad } from "../api/user";
import { userAuth, userLogout, userRegister } from "./thunks";
const initialState = {
  username: "",
  id: 0,
  token: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
    });

    builder.addCase(userAuth.fulfilled, (state, action) => {
      state.token = action.payload.auth_token;
      state.isAuth = true;
      state.username = action.payload.username;
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.token = ""
      state.id = 0
      state.username = ''
      state.isAuth = false
    });
  },
});

export default userSlice.reducer;

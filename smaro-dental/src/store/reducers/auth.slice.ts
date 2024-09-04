import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    name: "",
    email: "",
    mobile:"",
    id: 0,
    org_id: "",
    role_id: 0,
    created_at: "",
    last_login: "",
    inserted_time:"",
  },
  expiresIn: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      Object.assign(state, action.payload);
    },
    logOut: (state) => {
      state.token = initialState.token
      state.user = initialState.user
      state.expiresIn = initialState.expiresIn
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  userToken: string | null;
  nickname: string | null;
  account_id: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userToken: null,
  nickname: null,
  account_id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ token: string; nickname: string; account_id: string }>
    ) {
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
      state.nickname = action.payload.nickname;
      state.account_id = action.payload.account_id;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userToken = null;
      state.nickname = null;
      state.account_id = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
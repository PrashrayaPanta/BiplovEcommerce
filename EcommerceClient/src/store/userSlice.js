import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: JSON.parse(localStorage.getItem("userInfo")) || null,
  },

  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },

    clearUser: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

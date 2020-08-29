import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addPhoto(state, action) {
      state.push(action.payload);
    },
    removePhoto(state, action) {
      state.pop(action.payload);
    },
  },
});

export const { addPhoto, removePhoto } = favoritesSlice.actions;

export default favoritesSlice.reducer;

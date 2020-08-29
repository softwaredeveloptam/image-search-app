import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
		photos: []
	},
  reducers: {
    addPhoto(state, action) {
      state.photos.push(action.payload);
    },
    removePhoto(state, action) {
      state.photos.pop(action.payload);
    },
  },
});

export const { addPhoto, removePhoto } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectPhoto = state => state.favorites.photos;
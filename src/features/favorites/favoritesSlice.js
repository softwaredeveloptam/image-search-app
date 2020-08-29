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
      // get the id of the picture, then remove it
      state.photos.pop();
    },
  },
});

export const { addPhoto, removePhoto } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectAllPhotos = state => state.favorites.photos;
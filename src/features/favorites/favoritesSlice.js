import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const favoritesAdapter = createEntityAdapter();

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesAdapter.getInitialState(),
  reducers: {
    addList(state, action) {
      favoritesAdapter.addOne(state, action.payload);
    },
    removeList(state, action) {
      const id = action.payload.title;
      action.payload.id = id;
      favoritesAdapter.removeOne(state, action.payload);
    },
    addPhotoToList(state, action) {
      const { id } = action.payload;
      let list = state.entities[id];

      if (list) {
        favoritesAdapter.updateOne(
          state,
          state.entities[id].photoArr.push(action.payload.photoId)
        );
      }
    },
    removePhotoFromList(state, action) {
      const { id } = action.payload;
      const list = state.entities[id];

      console.log(action.payload);

      if (list) {
        favoritesAdapter.updateOne(
          state,
          state.entities[id].photoArr.splice(
            state.entities[id].photoArr.indexOf(action.payload.photoId),
            1
          )
        );
      }
    },
  },
});

export const {
  addList,
  addPhotoToList,
  removeList,
  removePhotoFromList,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const favoritesSelectors = favoritesAdapter.getSelectors(
  (state) => state.favorites
);

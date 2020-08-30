import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";

const favoritesAdapter = createEntityAdapter();

const selectId = (instance) => {
  return instance.listTitle;
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesAdapter.getInitialState(),
  reducers: {
    addList(state, action) {
      console.log(action.payload);
      favoritesAdapter.addOne(state, action.payload);
    },
    removeList(state, action) {
      const id = action.payload.title;
      action.payload.id = id;
      favoritesAdapter.removeOne(state, action.payload);
    },
    addPhoto(state, action) {
      const {id} = action.payload;
      let list = state.entities[id];
      console.log(current(list), "we're in addPhoto");
      if(current(list)) {
        let newList = current(list);
        newList.photoArr.push(action.payload.photoId);
      }
    },
    removePhoto(state, action) {
      const {title} = action.payload;
      const list = state.entities[title]
      // if(list) {
      //   remove Photo from Array
      // }   
    },
  },
});

export const { addList, addPhoto, removeList, removePhoto } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const favoritesSelectors = favoritesAdapter.getSelectors(state => state.favorites);
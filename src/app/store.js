import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favorites/favoritesSlice';

export default configureStore({
  reducer: {
    favorites: favoritesReducer
  },
});

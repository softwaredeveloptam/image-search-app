import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export default configureStore({
  reducer: {
    // counter: counterReducer,
    favorites: favoritesReducer
  },
});

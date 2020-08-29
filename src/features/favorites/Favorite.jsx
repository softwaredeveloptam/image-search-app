import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPhoto, removePhoto, selectPhoto } from "./favoritesSlice";

export function Favorite(props) {
  const favoritePhotos = useSelector(selectPhoto);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(addPhoto(props.photo.id))}>
          Add Photo
        </button>
        <button onClick={() => dispatch(removePhoto(props.photo.id))}>
          Remove Photo
        </button>
      </div>
    </div>
  );
}

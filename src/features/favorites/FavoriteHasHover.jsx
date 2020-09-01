import React, { useEffect, useState } from "react";
import { downloadPhotoType } from "../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import {
  removePhotoFromList,
  favoritesSelectors,
} from "./favoritesSlice";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function FavoriteHasHover(props) {
  const {
    classes,
    photo,
    setHoverEffect,
    setShowModal,
    setSinglePhotoInfo,
    setRenderPage,
  } = props;
  const dispatch = useDispatch();

  let listExists = useSelector((state) =>
    favoritesSelectors.selectById(state, "Default")
  );

  return (
    <GridListTile key={photo.id}>
      <img
        onClick={() => {
          console.log("We're here in Home Photos onClick");
          setShowModal(true);
          setSinglePhotoInfo(photo);
        }}
        onMouseLeave={() => setHoverEffect(false)}
        src={photo.urls.small}
        alt={photo.alt_description}
      ></img>

      <GridListTileBar
        subtitle={
          <span>
            Photo by:{" "}
            <a
              href={`https://unsplash.com/@${photo.user.username}?utm_source=zehitomo-tam-coding-challenge&utm_medium=referral`}
            >
              {photo.user.name}
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=zehitomo-tam-coding-challenge&utm_medium=referral">
              Unsplash
            </a>
          </span>
        }
        actionIcon={
          <>
            <IconButton
              className={classes.icon}
              onClick={() => {
                downloadPhotoType(photo.id, "regular");
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>

            <IconButton
              className={classes.icon}
              aria-label={`info about this`}
              onClick={() => {
                if (listExists) {
                  console.log("removing photo from an existing list");
                  let photoToRemove = {
                    id: "Default",
                    photoId: photo.id,
                  };
                  dispatch(removePhotoFromList(photoToRemove));
                  setRenderPage(true);
                } 
              }}
            >
              <RemoveIcon />
            </IconButton>
          </>
        }
        onMouseEnter={() => setHoverEffect(true)}
        onMouseLeave={() => setHoverEffect(false)}
      />
    </GridListTile>
  );
}

export default FavoriteHasHover;

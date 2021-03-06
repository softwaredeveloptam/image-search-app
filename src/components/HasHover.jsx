import React from "react";
import { downloadPhotoType } from "../utils/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhotoToList,
  favoritesSelectors,
  addList,
} from "../features/favorites/favoritesSlice";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function HasHover(props) {
  const {
    classes,
    photo,
    setHoverEffect,
    setShowModal,
    setSinglePhotoInfo,
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
                  console.log("adding to an existing list");
                  let newPhoto = {
                    id: "Default",
                    photoId: photo.id,
                  };

                  dispatch(addPhotoToList(newPhoto));
                } else {
                  console.log("created a new list");
                  let newList = {
                    id: "Default",
                    listTitle: "Default",
                    description: "none",
                    photoArr: [photo.id],
                  };
                  dispatch(addList(newList));
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </>
        }
        onMouseEnter={() => setHoverEffect(true)}
        onMouseLeave={() => setHoverEffect(false)}
      />
    </GridListTile>
  );
}

export default HasHover;

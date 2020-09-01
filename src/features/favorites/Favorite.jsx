import React, { useState, useEffect } from "react";

// Utils
import { fetchPhoto } from "../../utils/index";

// React-Redux
import { useSelector } from "react-redux";
import { favoritesSelectors } from "./favoritesSlice";

// Components
import SinglePhoto from "../../components/SinglePhoto";
import HasNoHover from "../../components/HasNoHover";

// Styling
import { makeStyles, GridList, Grid } from "@material-ui/core";
import FavoriteHasHover from "./FavoriteHasHover";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Favorite() {
  let favoritePhotos = useSelector((state) =>
    favoritesSelectors.selectById(state, "Default")
  ) || {
    photoArr: [],
  };

  const [photos, setPhotos] = useState(undefined);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});
  const [renderPage, setRenderPage] = useState(true);

  const classes = useStyles();

  async function loadPhotos() {
    if (favoritePhotos.photoArr.length >= 1) {
      let photoArr = [];

      for (let x = 0; x < favoritePhotos.photoArr.length; x++) {
        let newPhoto = await fetchPhoto(favoritePhotos.photoArr[x]);
        photoArr.push(newPhoto);
      }
      console.log("We're setting new photos!");
      setPhotos(photoArr);
    } else {
      console.log("No photos saved in State or all photos were deleted");
      setPhotos(undefined);
    }
    console.log("We're in loadPhotos");
  }

  useEffect(() => {
    if(renderPage === true) {
      setRenderPage(false);
      loadPhotos();
    }
  }, [renderPage]);

  return (
    <div>
    {photos ? (
        <div>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {photos.map((photo) => {
                if (hoverEffect && photo.id === hoverId) {
                  return (
                    <FavoriteHasHover
                      classes={classes}
                      photo={photo}
                      setHoverEffect={setHoverEffect}
                      setShowModal={setShowModal}
                      setSinglePhotoInfo={setSinglePhotoInfo}
                      setHoverId={setHoverId}
                      setRenderPage={setRenderPage}
                    />
                  );
                } else {
                  return (
                    <HasNoHover
                      photo={photo}
                      setHoverEffect={setHoverEffect}
                      setHoverId={setHoverId}
                    />
                  );
                }
              })}
            </GridList>
          </div>
        </div>
    ) : (
      <p>There are no favorited photos to render</p>
    )}
      <div>
        {showModal ? (
          <SinglePhoto photo={singlePhotoInfo} setShowModal={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

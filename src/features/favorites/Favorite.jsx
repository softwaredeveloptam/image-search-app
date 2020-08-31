import React, { useState, useEffect } from "react";
import { fetchPhoto } from "../../utils/index";
import { useSelector } from "react-redux";
import { removePhotoFromList, favoritesSelectors } from "./favoritesSlice";
import SinglePhoto from "../../components/SinglePhoto";
import HasHover from "../../components/HasHover";
import HasNoHover from "../../components/HasNoHover";

// Styling
import {
  makeStyles,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   width: 1000,
  //   height: 1000,
  // },
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

  const [photos, setPhotos] = useState([]);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});

  const classes = useStyles();

  async function loadPhotos() {
    if (favoritePhotos.photoArr.length > 1) {
      let photoArr = [];

      for (let x = 0; x < favoritePhotos.photoArr.length; x++) {
        let newPhoto = await fetchPhoto(favoritePhotos.photoArr[x]);
        photoArr.push(newPhoto);
      }
      console.log("We're setting new photos!");
      setPhotos(photoArr);
    } else {
      console.log("No photos saved in State");
    }
    console.log("We're in loadPhotos");
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div>
      <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {photos.map((photo) => {
                if (hoverEffect && photo.id === hoverId) {
                  return (
                    <HasHover
                      classes={classes}
                      photo={photo}
                      setHoverEffect={setHoverEffect}
                      setShowModal={setShowModal}
                      setSinglePhotoInfo={setSinglePhotoInfo}
                      setHoverId={setHoverId}
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

      <div>
        {showModal ? (
          <SinglePhoto photo={singlePhotoInfo} setShowModal={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

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
import { makeStyles, GridList } from "@material-ui/core";
import FavoriteHasHover from "./FavoriteHasHover";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  const classes = useStyles();

  const [photos, setPhotos] = useState(undefined);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});
  const [renderPage, setRenderPage] = useState(true);
  const [listName, setListName] = useState("Default");

  let favoritePhotos = useSelector((state) =>
    favoritesSelectors.selectById(state, listName)
  ) || {
    photoArr: [],
  };

  let currentLists =
    useSelector((state) => favoritesSelectors.selectIds(state)) || false;

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
    if (renderPage === true) {
      setRenderPage(false);
      loadPhotos();
    }
  }, [renderPage]);

  return (
    // Select from a Drop down
    // When selection occurs, show the list
    // Allow the list title and description to be editted
    <>
      {currentLists ? (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="list-selection-label">Select A List</InputLabel>
            <Select labelId="list-selection-label" id="download-select">
              {currentLists.map((listId) => {
                return (
                  <MenuItem
                    onClick={() => {
                      setListName(listId);
                      setRenderPage(true);
                    }}
                  >
                    {listId}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      ) : (
        <p>There are no favorited photos to render</p>
      )}
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
    </>
  );
}

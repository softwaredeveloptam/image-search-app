import React, { useEffect, useState } from "react";

// Utils
import { unsplash } from "../utils/index";

// React-Redux
import { useStore } from "react-redux";

// Components
import SinglePhoto from "./SinglePhoto";
import HasHover from "./HasHover";
import HasNoHover from "./HasNoHover";

// Styling
import {
  makeStyles,
  Grid,
  GridList,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(undefined);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});
  const storeState = useStore();

  const classes = useStyles();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchPhotos = async (searchWord) => {
    if (searchWord) {
      const photoJSON = await unsplash.search.photos(searchWord, 1, 10, {
        orientation: "portrait",
      });
      const photos = await photoJSON.json();
      setSearchResults(photos);
    } else {
      setSearchResults(undefined);
    }
  };

  useEffect(() => {
    fetchPhotos(searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Grid item xs={12}>
        <TextField
          variant="filled"
          margin="normal"
          id="searchTerm"
          label="Looking for..."
          name="searchTerm"
          autoFocus
          value={searchTerm}
          onChange={handleChange}
          color="primary"
          placeholder="Search"
          InputProps={{
            endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
            ),
          }}
        />
      </Grid>
      <br />
      <button
        onClick={() => {
          console.log("Search Term: ", searchTerm);
          console.log("Search Results\n", searchResults);
          console.log("Store State\n", storeState.getState());
        }}
      >
        Test
      </button>
      {searchResults ? (
        <>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.root} centered="true">
              {searchResults.results.map((photo) => {
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
        </>
      ) : (
        <p>Please use the search bar to look up photos</p>
      )}
      <div>
        {showModal ? (
          <SinglePhoto photo={singlePhotoInfo} setShowModal={setShowModal} />
        ) : null}
      </div>
    </>
  );
}

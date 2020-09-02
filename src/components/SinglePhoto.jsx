import React, { useState } from "react";

// React-Redux
import {
  addList,
  addPhotoToList,
  favoritesSelectors,
} from "../features/favorites/favoritesSlice";
import { useSelector, useDispatch } from "react-redux";

// Utils
import { downloadPhotoType } from "../utils/index";

// Styles
import "../styles/SinglePhotoModal.css";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SinglePhotoModal(props) {
  const { photo, setShowModal } = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);
  const [openNewList, setOpenNewList] = useState(false);
  const [listName, setListName] = useState("Default");

  // useSelector for names of all the IDs
  let currentLists =
    useSelector((state) => favoritesSelectors.selectIds(state)) || false;

  function checkCurrentLists() {
    if(currentLists.length > 0) {
      console.log("currentLists is greater than 0");
    } else {
      currentLists = false;
    }
  }

  let listExists = useSelector((state) =>
    favoritesSelectors.selectById(state, listName)
  );

  const handleCloseNewList = () => {
    setOpenNewList(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShowModal(false);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const newListBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Create New Collection</h2>
      <form className={classes.root}>
        <TextField
          required
          id="outlined-required"
          label="Title"
          value={title}
          onChange={handleChangeTitle}
          variant="standard"
          placeholder="Please enter a title here"
        />
        <br />
        <TextField
          id="filled-multiline-static"
          label="Description"
          multiline
          rows={5}
          placeholder="Please enter a description here"
          variant="standard"
          onChange={handleChangeDescription}
        />
        <br></br>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => {
            setListName(title);
            if (listExists) {
              console.log("adding to an existing list");
              let newPhoto = {
                id: title,
                photoId: photo.id,
              };

              dispatch(addPhotoToList(newPhoto));
            } else {
              console.log("created a new list");
              let newList = {
                id: title,
                listTitle: title,
                description: description,
                photoArr: [photo.id],
              };
              dispatch(addList(newList));
            }
            console.log(currentLists);
            handleClose();
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img src={photo.urls.small} alt={photo.alt_description}></img>

      <br />
      {checkCurrentLists()}

      <FormControl className={classes.formControl}>
        <InputLabel id="download-select-label">Download</InputLabel>
        <Select labelId="download-select-label" id="download-select">
          <MenuItem
            onClick={() => {
              downloadPhotoType(photo.id, "small");
            }}
          >
            Small
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadPhotoType(photo.id, "regular");
            }}
          >
            Regular
          </MenuItem>
          <MenuItem
            onClick={() => {
              downloadPhotoType(photo.id, "full");
            }}
          >
            Full
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="favoriteAdd-select-label">
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            ❤️
          </span>{" "}
          Favorites
        </InputLabel>
        <Select labelId="favoriteAdd-select-label" id="favoriteAdd-select">
          {/* map all lists here */}

          {currentLists ? (
            <div>
              {currentLists.map((listId) => {
                return (
                  <MenuItem
                    onClick={() => {
                      console.log("adding to an existing list");
                      let newPhoto = {
                        id: listId,
                        photoId: photo.id,
                      };

                      dispatch(addPhotoToList(newPhoto));
                      handleClose();
                    }}
                  >
                    {listId}
                  </MenuItem>
                );
              })}
            </div>
          ) : (
            <MenuItem
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
                handleClose();
              }}
            >
              Default
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              console.log("open a new modal");
              setOpenNewList(true);
            }}
          >
            Create New List
          </MenuItem>
        </Select>
      </FormControl>
      <Modal open={openNewList} onClose={handleCloseNewList}>
        {newListBody}
      </Modal>
    </div>
  );

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

export default SinglePhotoModal;

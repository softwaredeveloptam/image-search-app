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

  let listExists = useSelector((state) =>
    favoritesSelectors.selectById(state, "Default")
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleChangeTitle}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleChangeDescription}
      />
    </div>
  );

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img src={photo.urls.small} alt={photo.alt_description}></img>

      <br />

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
        <InputLabel id="favoriteAdd-select-label">❤️ Favorites</InputLabel>
        <Select labelId="favoriteAdd-select-label" id="favoriteAdd-select">
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
            }}
          >
            First Collection
          </MenuItem>

          {/* map all lists here */}

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

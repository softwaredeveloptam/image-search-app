import React, { useState } from "react";
import ReactDOM from "react-dom";

// Utils
import { downloadPhotoType } from "../utils/index";

// Styles
import "../styles/SinglePhotoModal.css";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

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
}));

function SinglePhotoModal(props) {
  const { photo, setShowModal } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img src={photo.urls.small} alt={photo.alt_description}></img>
      <br></br>
      <button
        onClick={handleClose}
      >
        Close
      </button>
      <br />
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

      <br />

      <button
        className={"btn"}
        onClick={() => {
          downloadPhotoType(photo.id, "small");
        }}
      >
        Download Small
      </button>

      <br />
      <button
        className={"btn"}
        onClick={() => {
          downloadPhotoType(photo.id, "regular");
        }}
      >
        Download Regular
      </button>

      <br />
      <button
        className={"btn"}
        onClick={() => {
          downloadPhotoType(photo.id, "full");
        }}
      >
        Download Full
      </button>
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

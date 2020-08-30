import React, { useState } from "react";
import ReactDOM from "react-dom";
import { downloadPhotoType } from "../utils/index";
import "../styles/SinglePhotoModal.css";

function SinglePhotoModal(props) {
  const { photo, setShowModal } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="modal">
      <div>
        <img
          className="modalImage"
          src={photo.urls.small}
          alt={photo.alt_description}
        ></img>
        <br></br>
        <button
          onClick={() => {
            setShowModal(false);
          }}
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
    </div>
  );
}

function SinglePhotoModalPortal(props) {
  return ReactDOM.createPortal(SinglePhotoModal(props), document.body);
}

export default SinglePhotoModalPortal;

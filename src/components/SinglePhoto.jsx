import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/SinglePhotoModal.css";

function SinglePhotoModal(props) {

	const { photo, setShowModal } = props;
	const [Title, setTitle] = useState("");
	const [Description, setDescription] = useState("");

	const handleChange = (event) => {
    setTitle(event.target.value);
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
				onClick={()=> {
					setShowModal(false);
				}}
				>Close
				</button>

				<input
					type="text"
					placeholder="Title"
					value={Title}
					onChange={handleChange}
    		/>

				<button>
					Download Small
				</button>

				<button>
					Download Medium
				</button>

				<button>
					Download Large
				</button>
			</div>
		</div>
	)
}

function SinglePhotoModalPortal(props) {
	return ReactDOM.createPortal(SinglePhotoModal(props), document.body);
}

export default SinglePhotoModalPortal;
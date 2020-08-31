import React from "react";

function HasNoHover(props) {
  const { photo, setHoverEffect, setHoverId } = props;

  return (
    <div key={photo.id}>
      <img
        onMouseEnter={() => {
          setHoverEffect(true);
          setHoverId(photo.id);
        }}
        src={photo.urls.small}
        alt={photo.alt_description}
      ></img>
    </div>
  );
}

export default HasNoHover;

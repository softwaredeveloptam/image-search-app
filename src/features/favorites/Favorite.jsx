import React, { useState, useEffect } from "react";
import { fetchPhoto } from "../../utils/index";
import { useSelector } from "react-redux";
import { removePhotoFromList, favoritesSelectors } from "./favoritesSlice";
import SinglePhoto from "../../components/SinglePhoto";
import HasHover from "../../components/HasHover";
import HasNoHover from "../../components/HasNoHover";

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
      <div>
        <button
          onClick={() => {
            console.log("** Favorite Photos **\n", favoritePhotos);
            console.log("** Photos **\n", photos);
          }}
        >
          Current State of Photos
        </button>
        <button
          onClick={() => {
            loadPhotos();
          }}
        >
          Trigger Load Photos
        </button>
      </div>

      <div>
        {photos.map((photo) => {
          if (hoverEffect && photo.id == hoverId) {
            return (
              <HasHover
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
      </div>

      <div>
        {showModal ? (
          <SinglePhoto photo={singlePhotoInfo} setShowModal={setShowModal} />
        ) : null}
      </div>
    </div>
  );
}

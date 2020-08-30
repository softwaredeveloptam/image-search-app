import React, { useState, useEffect } from "react";
import { fetchPhoto, downloadPhoto } from "../../utils/index";
import { useSelector, useDispatch } from "react-redux";
import {
  addPhotoToList,
  removePhotoFromList,
  favoritesSelectors,
} from "./favoritesSlice";
import SinglePhoto from "../../components/SinglePhoto";

export default function Favorite(props) {
  let favoritePhotos = useSelector(state => favoritesSelectors.selectById(state, "Default")) || {
    photoArr: [],
  };

  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [hoverEffect, setHoverEffect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [singlePhotoInfo, setSinglePhotoInfo] = useState({});


  async function loadPhotos() {

    if (favoritePhotos.photoArr.length > 1) {
      let photoArr = [];

      for (let x = 0; x < favoritePhotos.photoArr.length; x++) {
        let newPhoto = await fetchPhoto(favoritePhotos.photoArr[x]);
        photoArr.push(newPhoto);
      }
      console.log("We're setting new photos!")
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
          if (hoverEffect) {
            return (
              <div key={photo.id}>
                <img
                  // className={"photoImg"}
                  // onMouseEnter={() => setHoverEffect(true)}
                  onClick={() => {
                    console.log("We're here in Favorite Photos onClick");
                    setShowModal(true);
                    setSinglePhotoInfo(photo);
                  }}
                  onMouseLeave={() => setHoverEffect(false)}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                ></img>

                <button
                  className={"btn"}
                  onClick={() => {
                    downloadPhoto(photo.id);
                  }}
                >
                  Download
                </button>

                <p>
                  Photo by{" "}
                  <a
                    href={`https://unsplash.com/@${photo.user.username}?utm_source=zehitomo-tam-coding-challenge&utm_medium=referral`}
                  >
                    {photo.user.name}
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/?utm_source=zehitomo-tam-coding-challenge&utm_medium=referral">
                    Unsplash
                  </a>
                </p>
              </div>
            );
          } else {
            return (
              <div
                key={photo.id}
              >
                <img
                  onMouseEnter={() => setHoverEffect(true)}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                ></img>
              </div>
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
import React, { useState, useEffect } from "react";
import { fetchPhoto, downloadPhoto } from "../../utils/index";
import { useSelector, useDispatch } from "react-redux";
import { addPhoto, removePhoto, selectAllPhotos } from "./favoritesSlice";

export default function Favorite(props) {
  const favoritePhotos = useSelector(selectAllPhotos);
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [hoverEffect, setHoverEffect] = useState(false);

  async function loadPhotos() {
    if(favoritePhotos.length !== 0) {
      let photoArr = [];

      for(let x = 0; x < favoritePhotos.length; x++) {
        let newPhoto = await fetchPhoto(favoritePhotos[x]);
        photoArr.push(newPhoto);
      }

      setPhotos(photoArr);
    } else {
      console.log("No photos saved in State");
    }
  } 

  useEffect(() => {
    loadPhotos();
  }, [photos]);


  /*
    x Click on Favorites Tab 
    x Hide Main Page
    x Allow Favorite.jsx to appear

    // photo ID available then fetch the photo

    Show a pop down for showing all default pictures
    the popdown should have titles for other lists

    Click on type of list to show
    Each picture should be categorized into a list

  */

  return (
    <div>
      <div>
        <button onClick={() => dispatch(addPhoto(props.photo.id))}>
          Add Photo
        </button>
        <button onClick={() => dispatch(removePhoto(props.photo.id))}>
          Remove Photo
        </button>
        <button onClick={() => {
          console.log(favoritePhotos);
          console.log(photos);
        }}>Current State of Photos</button>
        <button onClick={() => {
          loadPhotos();
        }}>Trigger Load Photos</button>
      </div>

      <div>
        {photos.map((photo, index) => {
          return (
            <div
              key={index}
              // className={"imgContainer"}
            >
              <img
                // className={"photoImg"}
                onMouseEnter={() => setHoverEffect(true)}
                onMouseLeave={() => setHoverEffect(false)}
                src={photo.urls.small}
                alt={photo.alt_description}
              ></img>
            
              {!hoverEffect && (
                <>
                  <br />
                  <button
                    className={"btn"}
                    onClick={() => {
                      downloadPhoto(photo.id);
                    }}
                  >
                  Download
                  </button>
                  
                  <button
                    onClick={() => {
                      dispatch(addPhoto(photo.id));
                    }}
                  >
                  Favorite
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
                </>
              )}
            </div>
          )})}
      </div>
    </div>
  )
}
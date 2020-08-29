import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Unsplash from "unsplash-js";
import axios from "axios";
import "./App.css";

const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(undefined);
  const [hoverEffect, setHoverEffect] = useState(false);

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

  const downloadPhoto = async (photoId) => {
    if (photoId) {
      const getDownloadPhotoJSON = await unsplash.photos.getPhoto(photoId);
      const photoObj = await getDownloadPhotoJSON.json();
      unsplash.photos.downloadPhoto(photoObj);

      let response = await axios({
        url: photoObj.urls.regular,
        method: 'GET',
        responseType: 'blob'
      })

      let filename = photoObj.user.username + "-" + photoObj.id + ".jpg";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }
  };

  useEffect(() => {
    fetchPhotos(searchTerm);
  }, [searchTerm]);

  return (
    <div className="App">
      <NavBar />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />

      <button
        onClick={() => {
          console.log("Search Term: ", searchTerm);
          console.log("Search Results\n", searchResults);
        }}
      >
        Test
      </button>
      {searchResults ? (
        <>
          <div>
            {searchResults.results.map((photo, index) => {
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
                      <button>Favorite</button>
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
              );
            })}
          </div>
        </>
      ) : (
        <p>Please use the search bar to look up photos</p>
      )}
    </div>
  );
}

export default App;

// Unsplash Instance Library
import Unsplash from "unsplash-js";

// Http Fetch Library
import axios from "axios";

// Util Functions
export const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
});

export const fetchPhoto = async (photoId) => {
  if (photoId) {
    const getDownloadPhotoJSON = await unsplash.photos.getPhoto(photoId);
    const photoObj = await getDownloadPhotoJSON.json();
    return photoObj;
  }
};

export const downloadPhotoType = async (photoId, type) => {
  if (photoId) {
    const getDownloadPhotoJSON = await unsplash.photos.getPhoto(photoId);
    const photoObj = await getDownloadPhotoJSON.json();
    unsplash.photos.downloadPhoto(photoObj);

    let response = undefined;

    if (type === "regular") {
      response = await axios({
        url: photoObj.urls.regular,
        method: "GET",
        responseType: "blob",
      });
    } else if (type === "full") {
      response = await axios({
        url: photoObj.urls.full,
        method: "GET",
        responseType: "blob",
      });
    } else if (type === "small") {
      response = await axios({
        url: photoObj.urls.small,
        method: "GET",
        responseType: "blob",
      });
    }

    let filename =
      photoObj.user.username + "-" + photoObj.id + "-" + type + ".jpg";

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  }
};

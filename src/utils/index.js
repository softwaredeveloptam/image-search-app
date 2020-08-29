// Unsplash Instance Library
import Unsplash from "unsplash-js";

// Http Fetch Library
import axios from "axios";

export const unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
});

// Pending Implementation (Refactoring)
export const fetchPhotos = async (searchWord) => {
	if (searchWord) {
		const photoJSON = await unsplash.search.photos(searchWord, 1, 10, {
			orientation: "portrait",
		});
		const photos = await photoJSON.json();
		return photos;
	} else {
		return undefined;
	}
};

export const fetchPhoto = async (photoId) => {
    if (photoId) {
      const getDownloadPhotoJSON = await unsplash.photos.getPhoto(photoId);
      const photoObj = await getDownloadPhotoJSON.json();
      return photoObj;
    }
  }

// Pending Implementation (Refactoring)
export const downloadPhoto = async (photoId) => {
	if (photoId) {
		const getDownloadPhotoJSON = await unsplash.photos.getPhoto(photoId);
		const photoObj = await getDownloadPhotoJSON.json();
		unsplash.photos.downloadPhoto(photoObj);

		let response = await axios({
			url: photoObj.urls.regular,
			method: "GET",
			responseType: "blob",
		});

		let filename = photoObj.user.username + "-" + photoObj.id + ".jpg";

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
	}
};
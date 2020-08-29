import React from "react";
import "../styles/AllPhotosDisplay.css";

export default function AllPhotosDisplay(props) {
	console.log(props);
	if(props.searchResults) {
		return (
			<div className={"imgContainer"}>
				<p>We're in AllPhotosDisplay</p>
				{props.searchResults.results.map((photo, index) => {(
						<div key={index}>
							<img
								className={"photoImg"}
								src={photo.urls.regular}
							></img>
						</div>
					)}
				)}
			</div>
		) 
	} else {
			return (
				<p>nothing to show</p>
			)
	}
}

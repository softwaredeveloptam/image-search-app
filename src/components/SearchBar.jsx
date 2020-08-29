import React from "react";

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;

import React from "react";
import './Searchbar.css'
import { HiLocationMarker } from "react-icons/hi";

const Searchbar = () => {
  return (
    <div className="search-bar">
      <HiLocationMarker color="var(--orange)" size={25} />
      <input
        placeholder="Search by title/city/country"
        type="text"
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="btn">Search</button>
    </div>
  );
};

export default Searchbar;

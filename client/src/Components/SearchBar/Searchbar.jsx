import React from "react";
import './Searchbar.css'
import { HiLocationMarker } from "react-icons/hi";

const Searchbar = ({filter, setFilter}) => {
  return (
    <div className="search-bar">
      <HiLocationMarker color="var(--orange)" size={25} />
      <input
        placeholder="Search by title/city/country..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="btn">Search</button>
    </div>
  );
};

export default Searchbar;

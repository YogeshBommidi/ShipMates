import React from "react";
import "./MarketPlace.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import useLoads from "../../Hooks/useLoads";
import { PuffLoader } from "react-spinners";
import LoadCard from "../../Components/loadCard/LoadCard";

const Markets = () => {
  const { data, isError, isLoading } = useLoads();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error While Fetching the Market Data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="orange"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="market-wrapper">
      <div className="paddings innerWidth market-container">
        <Searchbar />
        <div className="paddings innerWidth Loads">
          {data?.map((card, i) => (
            <LoadCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Markets;

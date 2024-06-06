import React, { useContext, useState } from "react";
import "../MarketPlace/MarketPlace.css";
import Searchbar from "../../Components/SearchBar/Searchbar";
import useLoads from "../../Hooks/useLoads";
import { PuffLoader } from "react-spinners";
import LoadCard from "../../Components/loadCard/LoadCard";
import UserDetailContext from "../../Components/Context/UserDetailContext";

const Bids = () => {
  const { data, isError, isLoading } = useLoads();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bids },
  } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error While Fetching the Bids</span>
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
        <Searchbar filter={filter} setFilter={setFilter} />
        <div className="paddings innerWidth Loads">
          {data
            .filter((loads) => bids.map((bid) => bid.loadId).includes(loads.id))
            .filter(
              (loads) =>
                loads.title.toLowerCase().includes(filter.toLowerCase()) ||
                loads.fromAddress
                  .toLowerCase()
                  .includes(filter.toLowerCase()) ||
                loads.toAddress.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <LoadCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Bids;

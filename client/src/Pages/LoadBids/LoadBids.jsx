import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getLoadBids } from "../../utils/api";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import { PuffLoader } from "react-spinners";
import "./LoadBids.css";
import BidCards from "./BidCards";

const LoadBids = () => {
  const { pathname } = useLocation();
  const loadId = pathname.split("/").slice(-1)[0];
  const { user } = useAuth0();
  const email = user?.email;
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { data, isLoading, isError } = useQuery(
    ["loadBids", loadId, email, token],
    () => getLoadBids(loadId, email, token)
  );

  if (isError) {
    return (
      <div className="loadbids-wrapper">
        <span>Error While Fetching the Market Data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loadbids-wrapper">
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
    <div className="loadbids-wrapper">
      <div className="paddings innerWidth">
        <div className="loadbids-details">
          <div className="details-left">
            <span className="primaryText">{data?.loadbyid.title}</span>
            <span className="secondaryText">{data?.loadbyid.description}</span>
            <span className="orangeText">{data?.loadbyid.price}</span>
            <span>{data?.loadbyid.fromAddress}</span>
            <span>{data?.loadbyid.toAddress}</span>
          </div>
          <div className="details-right">
            <img src={data?.loadbyid.image} alt="Load Image" />
          </div>
        </div>
        <div className="bid-details">
          {data?.truckPrices.map((card, i) => (
            <BidCards card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadBids;

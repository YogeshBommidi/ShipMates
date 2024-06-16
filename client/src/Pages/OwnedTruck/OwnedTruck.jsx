import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import PuffLoader from "react-spinners/PuffLoader";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import { getOwnedTruck } from "../../utils/api";
import "./OwnedTruck.css";

const OwnedTruck = () => {
  const { user } = useAuth0();
  const email = user?.email;
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { data, isLoading, isError } = useQuery(
    ["truck", email, token],
    () => getOwnedTruck(email, token),
    {
      enabled: !!email && !!token,
    }
  );

  if (isError) {
    return (
      <div>
        <span>Error while fetching the data</span>
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

  if (!data) {
    return (
      <div className="ownedtruck-wrapper">
        <div className="paddings innerWidth ownedtruck-container">
          <span>No truck data available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ownedtruck-wrapper">
      <div className="paddings innerWidth ownedtruck-container">
        <div className="ownedtruck-left">
          <span className="primaryText">Driver Name : {data?.driverName}</span>
          <span className="orangeText">License No : {data?.license}</span>
          <span className="secondaryText">Truck Capacity : {data?.truckCapacity}</span>
        </div>
        <div className="ownedtruck-right">
          <img src={data?.image} alt="truck image" />
        </div>
      </div>
    </div>
  );
};

export default OwnedTruck;

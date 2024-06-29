import React, { useContext, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import { selectTruck } from "../../utils/api";
import { toast } from "react-toastify";
import "./Bookings.css";
import { PuffLoader } from "react-spinners";

const Booking = () => {
  const { loadId, truckEmail } = useParams(); 

  const { user } = useAuth0();
  const userEmail = user?.email;

  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { data, isLoading, isError } = useQuery(
    ["BookBid", loadId, userEmail, truckEmail, token],
    () => selectTruck(loadId, userEmail, truckEmail, token),
    {
      enabled: !!userEmail && !!token && !!loadId && !!truckEmail, // Enable query only if all dependencies are present
      retry: false, // Disable automatic retries
    }
  );

  if (isError) {
    return (
      <div className="loadbids-wrapper">
        <span>Error While selecting truck</span>
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
    <div className="Booking-wrapper">
      <div className="paddings inner-width Booking-container">
        <h1 className="primaryText">This Load is allocated to : </h1>
        <span className="primaryText">Driver Name : {data?.driverName}</span>
        <span className="orangeText">License : {data?.license}</span>
        <span className="secondaryText">Truck Capacity : {data?.truckCapacity}</span>
        <span className="primaryText">Truck Email : {data?.truckEmail}</span>
      </div>
    </div>
  );
};

export default Booking;

import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import PuffLoader from "react-spinners/PuffLoader";
import { myBookings } from "../../utils/api";
import BookingCard from "./BookingCard";
import './MyBooking.css'

const MyBooking = () => {
  const { user } = useAuth0();
  const email = user?.email;
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { data, isLoading, isError } = useQuery(
    ["truck", email, token],
    () => myBookings(email, token),
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
      <div className="mybooking-wrapper">
        <div className="paddings innerWidth ownedtruck-container">
          <span>No Bookings available</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mybooking-wrapper">
      <div className="paddings innerWidth mybooking-container">
        {data.map((card, i) => (
          <BookingCard card={card} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MyBooking;

import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import PuffLoader from "react-spinners/PuffLoader";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import { getOwnedLoads } from "../../utils/api";
import './OwnedLoads.css'
import OwnedLoadCard from "./OwnedLoadCard";

const ErrorComponent = ({ message }) => (
  <div className="owned-loads-wrapper">
    <span>Error while fetching the data: {message}</span>
  </div>
);

const LoadingComponent = () => (
  <div className="owned-loads-wrapper" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
    <PuffLoader size={80} color="orange" aria-label="Loading..." />
  </div>
);

const NoDataComponent = () => (
  <div className="owned-loads-wrapper">
    <div className="paddings inner-width owned-loads-container">
      <span>No Load data available</span>
    </div>
  </div>
);

const OwnedLoads = () => {
  const { user } = useAuth0();
  const email = user?.email;
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const { data, isLoading, isError, error } = useQuery(
    ["truck", email, token],
    () => getOwnedLoads(email, token),
    {
      enabled: !!email && !!token,
    }
  );

  if (isError) {
    return <ErrorComponent message={error.message} />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <NoDataComponent />;
  }

  return (
    <div className="owned-loads-wrapper">
      <div className="paddings inner-width owned-loads-container">
        <div className="paddings innerWidth owned-loads-data">
          {data.map((card, i) => (
            <OwnedLoadCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnedLoads;

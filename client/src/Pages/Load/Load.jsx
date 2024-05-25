import React from "react";
import "./Load.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getLoad } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { HiHeart } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import MapComponent from "../../Components/Map/MapComponent";

const Load = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getLoad(id)
  );
  console.log(data);

  if (isError) {
    return (
      <div>
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
    <div className="load-wrapper">
      <div className="paddings innerWidth load-container">
        <div className="like">
          <HiHeart color="black" size={20} />
        </div>
        <img src={data?.image} alt="Load Image" />
        <div className="load-details">
          <div className="detail-left">
            <div className="left-head">
              <span className="primaryText" style={{ fontSize: "2rem" }}>
                {data?.title}
              </span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                &#8377; {data?.price}
              </span>
            </div>
            <div className="desc">
              <span className="secondaryText" style={{ textAlign: "justify" }}>
                {data.description}
              </span>
            </div>
            <div className="load-location" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              {data.fromAddress}
            </div>
            <div className="load-location" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              {data.toAddress}
            </div>
            <button className="btn">Bid Your Price</button>
          </div>
          <div className="detail-right">
            <MapComponent
              fromAddress={data.fromAddress}
              toAddress={data.toAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Load;

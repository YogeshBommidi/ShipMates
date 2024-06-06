import React, { useContext, useState } from "react";
import "./Load.css";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { getLoad, removeBidding } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { MdLocationPin } from "react-icons/md";
import MapComponent from "../../Components/Map/MapComponent";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../Components/BookingModal/BookingModal";
import { Button, MantineProvider } from "@mantine/core";
import UserDetailContext from "../../Components/Context/UserDetailContext";
import { toast } from "react-toastify";
import Heart from "../../Components/Heart/Heart";

const Load = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getLoad(id)
  );
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { token, bids },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBiding, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBidding(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bids: prev.bids.filter((bids) => bids.loadId !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

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
          <Heart id={id} />
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
            {bids?.map((bids) => bids.loadId).includes(id) ? (
              <MantineProvider>
                <div>
                  <Button
                    variant="outline"
                    w={"100%"}
                    color="red"
                    onClick={() => cancelBiding()}
                    disabled={cancelling}
                  >
                    <span>Cancel Booking</span>
                  </Button>
                  <span>
                    Your visit already bidded for price :
                    {bids.filter((bids) => bids.loadId === id)[0].quotedPrice}
                  </span>
                </div>
              </MantineProvider>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Bid Your Price
              </button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              loadId={id}
              email={user?.email}
            />
          </div>
          <div className="detail-right" style={{ zIndex: "0" }}>
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

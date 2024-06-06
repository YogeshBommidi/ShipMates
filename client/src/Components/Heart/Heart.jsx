import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../Context/UserDetailContext";
import { toFav } from "../../utils/api";
import { checkFavourities, updateFavourities } from "../../utils/common";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { favourities, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    if (favourities) {
      setHeartColor(checkFavourities(id, favourities));
    }
  }, [id, favourities]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourities: updateFavourities(id, prev.favourities),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    handleLike();
  };

  return (
    <div>
      <AiFillHeart
        size={24}
        color={heartColor}
        onClick={handleClick}
      />
    </div>
  );
};

export default Heart;

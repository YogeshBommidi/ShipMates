import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../Components/Context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourities = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourities",
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourities: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);
  return { data, isLoading, isError, refetch };
};

export default useFavourities;

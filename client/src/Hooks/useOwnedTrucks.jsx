import React from "react";
import { useQuery } from "react-query";
import { getOwnedTruck } from "../utils/api";

const useOwnedTrucks = (email, token) => {
  const { data, isLoading, isError } = useQuery(
    "allOwnedTrucks",
    getOwnedTruck(email, token)
  );
  return data, isLoading, isError;
};

export default useOwnedTrucks;

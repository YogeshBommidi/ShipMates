import React from "react";
import { isError, useQuery } from "react-query";
import { getAllLoads } from "../utils/api";

const useLoads = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allMarket",
    getAllLoads,
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useLoads;

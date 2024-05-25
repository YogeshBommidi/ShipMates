import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllLoads = async () => {
  try {
    const response = await api.get("/load/getAllLoads", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    toast.error("Something Went wrong while fetching the Market Data");
    throw err;
  }
};

export const getLoad = async (id) => {
  try {
    const response = await api.get(`/load/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    toast.error("Something Went wrong while fetching the Market Data");
    throw err;
  }
};

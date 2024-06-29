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

export const createUser = async (email, token) => {
  try {
    await api.post(
      "/user/registerUser",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookLoad = async (quotedPrice, loadId, email, token) => {
  try {
    await api.post(
      `/truck/bidForLoad/${loadId}`,
      {
        loadId: loadId,
        quotedPrice: quotedPrice,
        truckPriceEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong in Bidding");
    throw error;
  }
};

export const removeBidding = async (id, email, token) => {
  try {
    await api.post(
      `/truck/cancelBid/${id}`,
      {
        truckPriceEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, removeBooking error");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/truck/toFav/${id}`,
      {
        loadId: id,
        truckEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, to favourites error");
    throw error;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/truck/getAllFav`,
      {
        truckEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.favLoads;
  } catch (error) {
    toast.error("Something went wrong, getAllFav error");
    throw error;
  }
};

export const getAllBids = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/truck/getAllBids`,
      {
        truckPriceEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error("Something went wrong, getAllBids error");
  }
};

export const createLoad = async (data, token) => {
  try {
    const res = await api.post(
      `/load/createLoad`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, creating loads");
    throw error;
  }
};

export const createTruck = async (data, token) => {
  try {
    const res = await api.post(
      `/truck/registerTruck`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, creating truck");
    throw error;
  }
};

export const getOwnedTruck = async (email, token) => {
  try {
    const res = await api.get("/user/getAllUserTrucks", {
      params: {
        email, // Pass the email as a query parameter
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // Return the data instead of the entire response
  } catch (error) {
    toast.error("Something went wrong, getAllUserTrucks error");
    throw error;
  }
};

export const getOwnedLoads = async (email, token) => {
  try {
    const res = await api.get(`/user/getAllUserLoads/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    toast.error("Something went wrong, getAllUserLoads error");
    throw error;
  }
};

export const getLoadBids = async (loadId, email, token) => {
  try {
    const res = await api.post(
      `/user/${loadId}`,
      {
        loadId: loadId,
        userEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    toast.error("Something went wrong while fetching the loadBids");
    throw err;
  }
};

export const selectTruck = async (loadId, userEmail, truckEmail, token) => {
  try {
    const res = await api.post(
      `/user/${loadId}/${truckEmail}`,
      {
        loadId: loadId,
        userEmail: userEmail,
        truckEmail: truckEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res;
  } catch (err) {
    toast.error("Something went wrong while selecting truck");
    throw err;
  }
};

export const myBookings = async (email, token) => {
  try {
    const res = await api.post(
      `/truck/getAllBookings`,
      { truckEmail : email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.bookedLoads
  } catch {
    toast.error("Something Went Wrong, myBookings errror");
    throw error;
  }
};

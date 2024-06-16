import React, { Suspense, useState } from "react";
import "./App.css";
import Website from "./Pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Load from "./Pages/Load/Load";
import UserDetailContext from "./Components/Context/UserDetailContext";
import Favourities from "./Pages/Favourities/Favourities";
import Bids from "./Pages/Bids/Bids";
import OwnedTruck from "./Pages/OwnedTruck/OwnedTruck";

const App = () => {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourities: [],
    bids: [],
    loads: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/MarketPlace">
                  <Route index element={<MarketPlace />} />
                  <Route path=":loadId" element={<Load />} />
                </Route>
                <Route path="/favourities" element={<Favourities />} />
                <Route path="/bids" element={<Bids />} />
                <Route path="/ownedTruck" element={<OwnedTruck/>} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
};

export default App;

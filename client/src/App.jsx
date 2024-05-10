import React from "react";
import "./App.css";
import "./index.css";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import Platform from "./Components/Platform/Platform";
import Brands from "./Components/Brands/Brands";
import Reviews from "./Components/Reviews/Reviews";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Platform />
      <Brands />
      <Reviews />
      <Footer />
    </div>
  );
};

export default App;

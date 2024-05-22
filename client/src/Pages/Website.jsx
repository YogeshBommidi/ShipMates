import React from 'react'
import Hero from "../Components/Hero/Hero";
import Features from "../Components/Features/Features";
import Platform from "../Components/Platform/Platform";
import Brands from "../Components/Brands/Brands";
import Reviews from "../Components/Reviews/Reviews";
import FAQ from "../Components/FAQ/FAQ";
import About from "../Components/About/About";

const Website = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Platform />
      <Brands />
      <Reviews />
      <About />
      <FAQ />
    </div>
  )
}

export default Website
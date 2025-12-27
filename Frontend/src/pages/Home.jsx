import React from "react";
import Hero from "..//components/Hero";
import Title from "../components/Title";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
};

export default Home;

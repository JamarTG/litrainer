import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col justify-center  max-w-[1080px] mx-auto ">
      <div className="py-5 px-5 lg:px-0 ">
        <Navbar />
      </div>

      <div className=" p-5 sm:items-center  ">
        <Hero />
        
      </div>
    </div>
  );
};

export default Landing;

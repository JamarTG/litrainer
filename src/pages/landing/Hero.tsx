import React from "react";
import { useNavigate } from "react-router-dom";
import Paths from "../../routes/paths";

const Hero: React.FC = () => {

  const navigate  = useNavigate()
  return (
    <div className="mx-auto  max-w-lg sm:max-w-2xl sm:px-4 py-8 sm:pt-14 sm:pb-20">
      <div className="mt-4 sm:mt-8 text-center">
        <div className="flex justify-center items-center">
          <button className="group relative grid overflow-hidden rounded-full  px-2.5 py-0.5 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(green,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,green_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-secondary transition-colors duration-200 " />
            <span className="text-xs z-10 font-bold text-offWhite">
              Made for players
            </span>
          </button>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-textwhite sm:text-6xl ">
          Master your moves, one game at a time
        </h1>
        <p className="mt-6 leading-7 text-landingText sm:text-lg sm:leading-8 text-muted">
          <span className="">
            Unlock your potential by analyzing and replaying your past games.
            Our platform lets you sequence your matches, identify mistakes, and
            learn from them. Elevate your chess skills with tools designed for
            improvement.
          </span>
        </p>
        <div className="mx-auto mt-10 w-full flex gap-4 justify-center items-center px-2">
          <button onClick = {() => navigate(Paths.TRAIN)} className="relative inline-flex whitespace-nowrap h-fit w-[45%] sm:w-[35%] items-center justify-center rounded-lg text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)]  bg-accent cursor-pointer   transition duration-150 arrow-button  ">
            <div className="inline-flex items-center font-bold  ">
              Train now
            </div>
          </button>
          <button  className="relative inline-flex whitespace-nowrap h-fit w-[45%] sm:w-[35%] items-center justify-center rounded-lg text-white shadow-xs px-[calc(theme(spacing[5])-1px)] py-[calc(theme(spacing[3])-1px)]  cursor-pointer bg-[#ffffff12] transition duration-150 ">
            <div className="inline-flex items-center font-bold gap-2 ">
            <svg
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 512 512"

  >
    <path d="M464 256a208 208 0 1 0-416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0zm188.3-108.9c7.6-4.2 16.8-4.1 24.3.5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3.5S176 352.9 176 344.2v-176c0-8.7 4.7-16.7 12.3-20.9z" />
  </svg>
              Watch demo

            </div>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import background from "../assets/background.svg";
import React from "react";

export default function Ads() {
  return (
    <div className="w-full h-full">
      <img
        src={background}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover  z-0"
      />

      <div className="relative z-10 px-4 py-2 m-2 flex flex-col gap-3">
        <h1 className="text-4xl">Increase your sales</h1>
        <p>
          Discover the Proven Methods to Skyrocket Your Sales! Unleash the
          Potential of Your Business and Achieve Remarkable Growth. Whether
          you're a seasoned entrepreneur or just starting out
        </p>
        <button className="bg-white text-[#1A71F6] px-4 py-2 rounded-xl font-bold w-fit cursor-pointer">
          Learn More
          {/* <div>{height}</div> */}
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { assets } from "../assets/assets";

const NavBar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%] ">
      <img src={assets.logo} alt="admin logo" className="w-[max(10%,80px)]" />
      <button
        onClick={() => setToken("")}
        className="rounded-full mx-20 my-2  sm:px-7 sm:py-2 text-xs sm:text-sm  px-5 py-2 text-white bg-gray-500 "
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;

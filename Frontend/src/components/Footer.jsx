import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        {/* On mobile: items stack vertically using flex
// On bigger screens (sm+): layout switches to grid
// Grid has 3 columns → first is wide (3fr), next two are smaller (1fr, 1fr)*/}
        <div className="">
          <img src={assets.logo} alt="" className="w-32" />
          <p className=" w-full md:w-2/3 text-gray-500">
            We offer the latest trends in fashion with premium quality and
            timeless designs. Shop confidently and elevate your everyday
            style.Trendy fashion. Premium quality. Everyday comfort.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get in touch </p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>+977 9864980727</li>
            <li>Shahikiran575@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-sm py-5 text-gray-500 text-center">
          Copyright @2025 forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

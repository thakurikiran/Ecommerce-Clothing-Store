import React from "react";
import PlaceOrder from "./../pages/PlaceOrder";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>

      <form
        onClick={onSubmitHandler}
        className="flex  w-full sm:w-1/2 border sm:flex-row items-center mx-auto my-6 pl-8 gap-3 "
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-xs px-10 py-4  text-white cursor-pointer"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;

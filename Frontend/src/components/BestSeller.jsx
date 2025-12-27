import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Productitem from "./Productitem";
import { Title } from "./Title";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, []);
  {
    /* .filter() goes through each product and keeps only the ones where item.bestseller is true.*/
  }
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"BESTSELLERS"} />
        <p className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our latest collection brings together the hottest trends in fashion.
        </p>
      </div>

      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {/*“The order of parameters in map is fixed. The first parameter is the current item and the second is the index. Swapping them causes logic errors and undefined values.*/}
        {bestSeller.map((item, index) => (
          <Productitem
            key={index}
            _id={item._id} //passed to props
            image={item.image}
            price={item.price}
            name={item.name}
          />
        ))}
        {/* creating one productitem passes only required data parent to child communication */}
      </div>
    </div>
  );
};

export default BestSeller;

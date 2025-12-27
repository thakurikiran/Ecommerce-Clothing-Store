import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./../context/ShopContext";
import { Title } from "./Title";
import Productitem from "./Productitem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        {/* passing props to title text1 is a props name and latest is the props value */}
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className=" w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Our latest collection brings together the hottest trends in fashion.
          From casual streetwear to elegant eveningwear, find your perfect look
          today.
        </p>
      </div>

      {/* Rendering product list */}
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {/*“The order of parameters in map is fixed. The first parameter is the current item and the second is the index. Swapping them causes logic errors and undefined values.*/}
        {latestProducts.map((item, index) => (
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

export default LatestCollection;

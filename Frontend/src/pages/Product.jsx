import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productid } = useParams();
  const { products, currency, addToCart, cartitems } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productid) {
        setProductData(item);

        setImage(item.image[0]);

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productid, products]);

  return productData ? (
    <div className="border-t-2 border-gray-400 pt-10 transition-opacity ease-in  duration-500 opacity-100 ">
      <div className="flex gap-12  sm:gap-12 flex-col sm:flex-row">
        {/* Product Data */}

        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
          {/* Product images */}
          <div className="flex-1  flex flex-col-reverse gap-3  sm:flex-row  ">
            <div className="flex gap-8 pl-2 sm:flex-col overflow-x-auto  sm:w-[18.7%]   sm:overflow-y-scroll justify-between sm:justify-normal  gap-y-4 w-full">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className=" sm:w-full w-[24%]  sm:mb:3 flex-shrink-0  cursor-pointer"
                />
              ))}
            </div>
            <div className=" w-full sm:w-[80%]">
              <img src={image} className="w-full h-auto " alt="" />
            </div>
          </div>
          {/*Product info   */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} className="w-3.5" alt="" />
              <img src={assets.star_icon} className="w-3.5" alt="" />
              <img src={assets.star_icon} className="w-3.5" alt="" />
              <img src={assets.star_icon} className="w-3.5" alt="" />
              <img src={assets.star_dull_icon} className="w-3.5" alt="" />
              <p className="pl-2"> (122)</p>
            </div>
            <p className="mt-5 text-3xl font-medium">
              {currency} {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={` border py-2 px-4 cursor-pointer bg-gray-100 ${
                      item == size ? "border-orange-400" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5 border-gray-300 " />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% original product </p>
              <p> Cash on delivery is available on this product </p>
              <p> Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-300  px-5 py-3 text-sm ">
            Description
          </b>
          <p className="border border-gray-300 px-5 py-3 text-sm">
            Review(122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border  border-gray-300 px-6 py-6 text-sm text-gray-500">
          <p>
            Welcome to our online shopping store, where quality meets
            convenience. Explore a wide range of products carefully selected to
            match your style and everyday needs. Enjoy easy navigation, secure
            payments, and fast delivery—all designed to give you a smooth and
            satisfying shopping experience.
          </p>
          <p>
            Our e-commerce store offers a modern shopping experience with trendy
            products, affordable prices, and reliable service. From browsing to
            checkout, we make online shopping simple, safe, and enjoyable,
            bringing your favorite items right to your doorstep.
          </p>
        </div>
      </div>
      {/* --- showing related projects --- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Product;

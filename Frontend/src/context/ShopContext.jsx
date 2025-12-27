import React, { use, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const currency = "$";
  const delivery_fee = 10;
  const [cartitems, setCartitems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
    }
    let CartData = structuredClone(cartitems);

    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      } else {
        CartData[itemId][size] = 1;
      }
    } else {
      CartData[itemId] = {};
      CartData[itemId][size] = 1;
    }

    setCartitems(CartData);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemId][size] = quantity;
    // console.log(cartData);
    setCartitems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalCount += cartitems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalCount;
  };

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const items in cartitems) {
      let productInfo = products.find((product) => product._id === items);
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0)
            totalAmount += productInfo.price * cartitems[items][item];
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    currency,
    products,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartitems,
    getCartCount,
    updateQuantity,
    getCartTotal,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;

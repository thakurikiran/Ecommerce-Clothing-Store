import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartitems,
    setCartitems,
    getCartTotal,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name; // lastName
    const value = event.target.value; //Shahi

    /*
      firstName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    ["lastName"] : "Shahi"

    */
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee,
      };

      switch (method) {
        //Api calls for Cod
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.data.success) {
            setCartitems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        default:
          toast.error("Selected payment method is not available yet");
          break;
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-between flex-col sm:flex-row gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left side */}
      <div className=" flex flex-col gap-4 w-full sm:max-w-120">
        <div>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="FirstName"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="LastName"
          />
        </div>
        <div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Emailaddress"
          />
        </div>
        <div>
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full sm:max-w-120  ">
        {/* Right Side */}
        <div className=" w-full mt-8 min-w-90">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <div>
            <Title text1={"PAYMENT "} text2={"METHOD"} />
            {/* Payment Selection */}
            <div className="flex  flex-col gap-3 lg:flex-row  ">
              {/* <div
                onClick={() => setMethod("khalti")}
                className="flex gap-3  border w-35  border-gray-300 items-center p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border  border-gray-300   rounded-full ${
                    method === "khalti" ? "bg-green-400" : ""
                  } `}
                ></p>
                <img
                  className="h-10  mx-4 py-1"
                  src={assets.khalti_logo}
                  alt=""
                />
              </div> */}
              <div
                onClick={() => setMethod("razor")}
                className="flex gap-3  border w-35  border-gray-300 items-center p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border  border-gray-300   rounded-full ${
                    method === "razor" ? "bg-green-400" : ""
                  } `}
                ></p>
                <img
                  className="h-8  mx-4 py-1"
                  src={assets.stripe_logo}
                  alt=""
                />
              </div>
              <div
                onClick={() => setMethod("stripe")}
                className="flex gap-3  border w-44  border-gray-300 items-center p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border  border-gray-300   rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  } `}
                ></p>
                <img
                  className="h-7  mx-4 pr-8 py-1"
                  src={assets.razorpay_logo}
                  alt=""
                />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex gap-3  border w-35  border-gray-300 items-center p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border  border-gray-300   rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                >
                  {" "}
                </p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-end   mt-8">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 text-sm flex items-center cursor-pointer "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

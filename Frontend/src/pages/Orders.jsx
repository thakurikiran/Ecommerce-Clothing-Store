import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, token, navigate } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 mt-6">No orders yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded p-4 text-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm">
                  <p className="font-medium">Order ID: {order._id}</p>
                  <p className="text-gray-500">
                    Date: {formatDate(order.date)}
                  </p>
                </div>
                <div className="text-sm">
                  <p>
                    Status: <span className="font-medium">{order.status}</span>
                  </p>
                  <p>
                    Payment:{" "}
                    <span className="font-medium">{order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {order.items?.map((item, index) => (
                  <div
                    key={`${order._id}-${index}`}
                    className="flex items-start gap-4 text-sm"
                  >
                    <img
                      className="w-16 h-16 object-cover border border-gray-200"
                      src={item.image?.[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <p>
                          {currency} {item.price}
                        </p>
                        <p>Qty: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium text-gray-700">Delivery Address</p>
                <p>
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state} {order.address?.zipcode}
                </p>
                <p>{order.address?.country}</p>
                <p>Phone: {order.address?.phone}</p>
              </div>

              <div className="mt-4 text-sm font-medium">
                Total: {currency} {order.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

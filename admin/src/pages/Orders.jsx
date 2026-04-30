import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const STATUS_OPTIONS = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: { token },
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

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order,
          ),
        );
        toast.success("Order status updated");
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="w-full">
      <p className="mb-4">Orders</p>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded p-4 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="text-sm">
                  <p className="font-medium">Order ID: {order._id}</p>
                  <p className="text-gray-500">
                    Customer: {order.address?.firstName}{" "}
                    {order.address?.lastName}
                  </p>
                  <p className="text-gray-500">Phone: {order.address?.phone}</p>
                </div>
                <div className="text-sm">
                  <p>
                    Amount: <span className="font-medium">${order.amount}</span>
                  </p>
                  <p className="text-gray-500">
                    Payment: {order.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium">Items</p>
                <div className="mt-2 flex flex-col gap-2">
                  {order.items?.map((item, index) => (
                    <div key={`${order._id}-${index}`}>
                      {item.name} | Size: {item.size} | Qty: {item.quantity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium">Delivery Address</p>
                <p>
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state} {order.address?.zipcode}
                </p>
                <p>{order.address?.country}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                <p className="font-medium">Status</p>
                <select
                  className="border border-gray-300 px-2 py-1 rounded"
                  value={order.status}
                  onChange={(event) =>
                    updateStatus(order._id, event.target.value)
                  }
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

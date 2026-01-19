// placing order using COD method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place order using Cash On Delivery only
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "items are required" });
    }

    if (typeof amount !== "number" || Number.isNaN(amount)) {
      return res
        .status(400)
        .json({ success: false, message: "amount must be a number" });
    }

    if (!address || typeof address !== "object") {
      return res
        .status(400)
        .json({ success: false, message: "address is required" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
      // status/date handled by schema defaults
    };

    const order = new orderModel(orderData);
    await order.save();

    // Clear user cart after successful order placement (COD checkout complete)
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

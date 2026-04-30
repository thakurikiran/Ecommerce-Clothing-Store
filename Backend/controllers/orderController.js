// placing order using COD method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place order using Cash On Delivery only
export const placeOrder = async (req, res) => {
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

// Placeholder handlers to preserve existing routes until implemented.
export const placeOrderStripe = async (req, res) => {
  res.status(501).json({ success: false, message: "Stripe not implemented" });
};

export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const usersOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "orderId and status are required",
      });
    }

    const updated = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order: updated });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

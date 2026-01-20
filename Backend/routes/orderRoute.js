// import express from "express";
// import {
//   placeOrderStripe,
//   placeOrder,
//   allOrders,
//   usersOrders,
//   updateStatus,
// } from "../controllers/orderController";

// import adminAuth from "./../middleware/adminAuth";

// import authUser from "../middleware/auth";

// const orderRouter = express.Router();

// //admin features

// orderRouter.post("/list", adminAuth, allOrders);
// orderRouter.post("/status", adminAuth, updateStatus);

// //payment features

// orderRouter.post("/place", authUser, placeOrder);
// orderRouter.post("/stripe", authUser, placeOrderStripe);

// //User Feature

// orderRouter.post("/userorders", authUser, usersOrders);

// export default orderRouter;

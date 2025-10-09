import express from "express";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";
import { authorizedRoles } from "../middleware/authMiddleware.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  myOrder,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/me/order").get(isAuthenticatedUser, myOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);

router
  .route("/admin/order")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder);

export default router;

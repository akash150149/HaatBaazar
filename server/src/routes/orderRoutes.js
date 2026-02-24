import { Router } from "express";
import {
  createOrder,
  createRazorpayOrder,
  listOrders,
  updateOrderStatus,
  verifyRazorpayPayment
} from "../controllers/orderController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(listOrders));
router.post("/", requireAuth, asyncHandler(createOrder));
router.patch("/:orderId/status", requireAuth, requireAdmin, asyncHandler(updateOrderStatus));
router.post("/payment/razorpay/order", requireAuth, asyncHandler(createRazorpayOrder));
router.post("/payment/razorpay/verify", requireAuth, asyncHandler(verifyRazorpayPayment));

export default router;

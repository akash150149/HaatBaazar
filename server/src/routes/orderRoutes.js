import { Router } from "express";
import {
  createOrder,
  createRazorpayOrder,
  listOrders,
  verifyRazorpayPayment
} from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(listOrders));
router.post("/", requireAuth, asyncHandler(createOrder));
router.post("/payment/razorpay/order", requireAuth, asyncHandler(createRazorpayOrder));
router.post("/payment/razorpay/verify", requireAuth, asyncHandler(verifyRazorpayPayment));

export default router;

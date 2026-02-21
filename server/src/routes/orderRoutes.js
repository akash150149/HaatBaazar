import { Router } from "express";
import { createOrder, listOrders } from "../controllers/orderController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", requireAuth, asyncHandler(listOrders));
router.post("/", requireAuth, asyncHandler(createOrder));

export default router;

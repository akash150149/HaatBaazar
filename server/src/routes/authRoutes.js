import { Router } from "express";
import { login, register, googleLogin } from "../controllers/authController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/google", asyncHandler(googleLogin));

export default router;

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  uploadProductImage,
  updateProduct
} from "../controllers/productController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", asyncHandler(listProducts));
router.get("/:id", asyncHandler(getProduct));
router.post("/upload-image", requireAuth, requireAdmin, upload.single("image"), asyncHandler(uploadProductImage));
router.post("/", requireAuth, requireAdmin, asyncHandler(createProduct));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateProduct));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteProduct));

export default router;

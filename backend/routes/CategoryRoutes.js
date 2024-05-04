import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
} from "../controllers/CategoryController.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(authenticate, authorizeAdmin, getAllCategories);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateCategory)
  .get(authenticate, authorizeAdmin, getCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory);
export default router;

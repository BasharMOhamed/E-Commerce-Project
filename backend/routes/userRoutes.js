import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getCurrentUserProfile,
  loginUser,
  logoutCurrentUser,
  updateCurrentUserProfile,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUser);
// http://localhost:5000/api/users/auth
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUser)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
export default router;

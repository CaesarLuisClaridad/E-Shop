import express from "express";
import {
    deleteUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  updateUser,
} from "../controller/userController.js";
import {
  authorizedRoles,
  isAuthenticatedUser,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/user/update_profile").post(isAuthenticatedUser, updateProfile);
router
  .route("/api/v1/admin/users/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser)


export default router;

import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser, addUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// 📌 Kullanıcı Kayıt (Register)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.route("/:id").delete(protect, deleteUser);
router.route("/").post(protect, addUser);


export default router;

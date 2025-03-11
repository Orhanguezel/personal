import express from "express";
import { getSocial, addSocial } from "../controllers/socialController.js";

const router = express.Router();

router.route("/").get(getSocial).post(addSocial);

export default router;

import express from "express";
import { getAboutInfo, updateAboutInfo,addAboutInfo } from "../controllers/aboutController.js";

const router = express.Router();

router.route("/:lang").get(getAboutInfo)
router.route("/").post(updateAboutInfo).post(addAboutInfo);

export default router;

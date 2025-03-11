import express from "express";

import userRoutes from "./userRoutes.js";
import projectRoutes from "./projectRoutes.js";
import skillRoutes from "./skillRoutes.js";
import aboutRoutes from "./aboutRoutes.js";
import educationRoutes from "./educationRoutes.js";
import experienceRoutes from "./experienceRoutes.js";
import sportRoutes from "./sportRoutes.js";
import socialRoutes from "./socialRoutes.js";
import blogRoutes from "./blogRoutes.js";

const router = express.Router();

// ✅ Tüm API Route'larını yönlendir
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/about", aboutRoutes);
router.use("/education", educationRoutes);
router.use("/experience", experienceRoutes);
router.use("/sports", sportRoutes);
router.use("/social", socialRoutes);
router.use("/blogs", blogRoutes);

export default router;

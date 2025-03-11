import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route("/:id/comments").post(addComment);

export default router;

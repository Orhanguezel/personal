import express from "express";
import {
  getSport,
  getSportById,
  addSport,
  updateSport,
  deleteSport,
} from "../controllers/sportController.js";


const router = express.Router();

router.route("/").get(getSport).post(addSport);
router.route("/:id").get(getSportById).put(updateSport).delete(deleteSport);



export default router;

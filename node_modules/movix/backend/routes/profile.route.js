import express from "express";
import { updateProfile, uploadImage } from "../controllers/profile.controller.js";

const router = express.Router();


router.put('/update', uploadImage, updateProfile);
export default router;
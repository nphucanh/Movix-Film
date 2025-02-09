import express from 'express';
import { getTrendingTv, getTvTrailer, getTvDetails, getSimilarTvs, getTvByCategory } from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailer);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvByCategory);

export default router;
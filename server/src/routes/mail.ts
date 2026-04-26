import { Router } from "express";
import { getMails } from "../controllers/mailController";

const router = Router();

router.get("/sync", getMails);

export default router;

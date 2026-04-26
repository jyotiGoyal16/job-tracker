import { Router } from "express";
import { getApplications } from "../controllers/applicationsController";

const router = Router();

router.get("/", getApplications);

export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { dashboardUser } from "../controllers/dashboard.controller";

const router = Router();

router.route('/').get(verifyJWT, dashboardUser)

export default router
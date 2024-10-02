import { Router } from "express";
import { logout } from "./controller.js";

const router = Router();
router.get("/logout", logout);
export default router;

import { Router } from "express";
import { profile } from "./controller.js";
import auth from "../../middlewares/authentication.middlware.js";

const router = Router();

router.get("/profile", auth, profile);

export default router;

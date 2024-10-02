import { Router } from "express";
import { register, handleRegister } from "./controller.js";

const router = Router();

router.get("/register", register);
router.post("/handleRegister", handleRegister);
export default router;

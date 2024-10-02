import { Router } from "express";
import { login, handleLogin } from "./controller.js";

const router = Router();

router.get("/login", login);
router.post("/handlelogin", handleLogin);
export default router;

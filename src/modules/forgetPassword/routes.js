import { Router } from "express";
import {
  forgetPassword,
  handleForgetPassword,
  verifyOtp,
  handleVerfiyOtp,
  resetPassword,
  handleResetPassword,
} from "./controller.js";

const router = Router();

router.get("/forget-password", forgetPassword);
router.post("/handle-forget-password", handleForgetPassword);
router.post("/handle-verify-otp", handleVerfiyOtp);

router.get("/verfiy-otp", verifyOtp);

router.get("/reset-password", resetPassword);

router.post("/handle-reset-password", handleResetPassword);
export default router;

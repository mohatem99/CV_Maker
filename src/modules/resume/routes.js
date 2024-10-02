import { Router } from "express";
import { handleResume, resume } from "./controller.js";
import upload from "../../middlewares/multerHost.middleware.js";
import auth from "../../middlewares/authentication.middlware.js";
const router = Router();

router.get("/resume", auth, resume);
router.post("/handleresume", auth, upload.single("image"), handleResume);
export default router;

import { Router } from "express";
import { handleResume, resume } from "./controller.js";
import { multerHost } from "../../middlewares/multerHost.middleware.js";
import auth from "../../middlewares/authentication.middlware.js";
import { extenstions } from "../../utils/fileExtenstions.js";
const router = Router();

router.get("/resume", auth, resume);
router.post(
  "/handleresume",
  auth,
  multerHost(extenstions.Images).single("image"),
  handleResume
);
export default router;

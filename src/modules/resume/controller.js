import { nanoid } from "nanoid";
import ResumeModel from "../../db/models/resume.js";
import { cloudinaryConfig } from "../../middlewares/cloudinary.js";

export const resume = async (req, res, next) => {
  const { type } = req.query;

  const resume = await ResumeModel.findOne({
    createdBy: req.session.userId,
    type,
  });

  let fileUrl;
  if (resume?.image) {
    fileUrl = resume.image.secure_url;
  }

  if (type == "ats") {
    return res.render("resume_ats.ejs", { session: req.session, resume });
  } else if (type == "brown") {
    return res.render("resume_brown.ejs", {
      session: req.session,
      resume,
      fileUrl,
    });
  } else {
    res.render("resume.ejs", { session: req.session, resume, fileUrl });
  }
};

export const handleResume = async (req, res, next) => {
  try {
    const { cv_details, type } = req.body;
    let image_url;
    const customId = nanoid(5);
    if (req.file) {
      const { secure_url, public_id } =
        await cloudinaryConfig().uploader.upload(req.file.path, {
          folder: `CV_Maker/images/${customId}`,
        });
      image_url = { secure_url, public_id };
    }
    await ResumeModel.findOneAndUpdate(
      { createdBy: req.session.userId, type },
      {
        $set: {
          ...JSON.parse(cv_details),
          image: image_url,
          createdBy: req.session.userId,
          type,
        },
      },
      { upsert: true, new: true }
    );
    return res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
};
